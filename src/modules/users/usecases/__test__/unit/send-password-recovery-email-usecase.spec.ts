import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';

import { SendPasswordRecoveryEmailUseCase } from '../../send-password-recovery-email.usecase';

import { PasswordRecoveryJwtPayload } from '@/common/@types/users/jwt-payloads.type';
import { TOKEN_TYPE } from '@/common/enums/token-type.enum';
import { User } from '@/modules/users/entities/users.entity';
import { JwtProviderMock } from '@/modules/users/providers/jwt/__MOCKS__/jwt-provider.mock';
import { IJwtProvider } from '@/modules/users/providers/jwt/jwt-provider.interface';
import { MailProviderMock } from '@/modules/users/providers/mail/__MOCKS__/mail-provider.mock';
import { IMailProvider } from '@/modules/users/providers/mail/mail-provider.interface';
import { TemplateEngineProviderMock } from '@/modules/users/providers/template-engine/__MOCKS__/template-engine-provider.mock';
import { ITemplateEngineProvider } from '@/modules/users/providers/template-engine/template-engine-provider.interface';
import { UsersInMemoryRepository } from '@/modules/users/repositories/in-memory/users-in-memory.repository';
import { IUsersRepository } from '@/modules/users/repositories/users-repository.interface';

describe('SendPasswordRecoveryEmailUseCase unit tests', () => {
  let sut: SendPasswordRecoveryEmailUseCase;
  let repository: IUsersRepository;
  let templateProvider: ITemplateEngineProvider;
  let jwtProvider: IJwtProvider;
  let mailProvider: IMailProvider;

  beforeEach(() => {
    repository = new UsersInMemoryRepository();
    templateProvider = new TemplateEngineProviderMock();
    jwtProvider = new JwtProviderMock();
    mailProvider = new MailProviderMock();
    sut = new SendPasswordRecoveryEmailUseCase(
      repository,
      jwtProvider,
      templateProvider,
      mailProvider,
    );
  });

  it('Should throw a NotFoundException when user is not found', async () => {
    const findByEmailSpy = jest.spyOn(repository, 'findByEmail');
    findByEmailSpy.mockResolvedValue(null);

    await expect(() =>
      sut.execute({ email: faker.internet.email() }),
    ).rejects.toBeInstanceOf(NotFoundException);

    expect(findByEmailSpy).toHaveBeenCalled();
  });

  it('Should create a jwt of type PasswordRecoveryJwtPayload', async () => {
    const user = { _id: 'userId' } as User;

    const findByEmailSpy = jest.spyOn(repository, 'findByEmail');
    findByEmailSpy.mockResolvedValue(user);
    const signJwtSpy = jest.spyOn(jwtProvider, 'sign');

    const payload: PasswordRecoveryJwtPayload = {
      token_type: TOKEN_TYPE.PASSWORD_RECOVERY,
      userId: user._id!,
    };

    await sut.execute({ email: faker.internet.email() });
    expect(findByEmailSpy).toHaveBeenCalled();
    expect(signJwtSpy).toHaveBeenCalledWith({ payload, expiresIn: '2h' });
  });

  it('Should send an email with the provided html template', async () => {
    const user = { _id: 'userId', name: faker.internet.userName() } as User;
    const input = { email: faker.internet.email() };

    const findByEmailSpy = jest.spyOn(repository, 'findByEmail');
    findByEmailSpy.mockResolvedValue(user);
    const signJwtSpy = jest.spyOn(jwtProvider, 'sign');
    const compileTemplateSpy = jest.spyOn(templateProvider, 'compile');
    const sendMailSpy = jest.spyOn(mailProvider, 'sendMail');

    const payload: PasswordRecoveryJwtPayload = {
      token_type: TOKEN_TYPE.PASSWORD_RECOVERY,
      userId: user._id!,
    };

    await sut.execute(input);

    const token = await signJwtSpy.mock.results[0].value;
    const html = await compileTemplateSpy.mock.results[0].value;

    const recoveryPasswordUrl = `http://example?token=${token}`;

    expect(findByEmailSpy).toHaveBeenCalled();
    expect(signJwtSpy).toHaveBeenCalledWith({ payload, expiresIn: '2h' });
    expect(compileTemplateSpy).toHaveBeenCalledWith('password-recovery.hbs', {
      link: recoveryPasswordUrl,
    });
    expect(sendMailSpy).toHaveBeenCalledWith({
      body: html,
      subject: 'Recuperação de Senha',
      to: { email: input.email, name: user.name },
    });
  });
});
