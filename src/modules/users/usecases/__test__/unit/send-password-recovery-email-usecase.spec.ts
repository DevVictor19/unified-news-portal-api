import { faker } from '@faker-js/faker';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

import { SendPasswordRecoveryEmailUseCase } from '../../send-password-recovery-email.usecase';

import { PasswordRecoveryJwtPayload } from '@/common/@types/users/jwt-payloads.type';
import { TOKEN_TYPE } from '@/common/enums/token-type.enum';
import { DatabaseServiceMock } from '@/modules/common/database/__MOCKS__/database-service.mock';
import { IDatabaseService } from '@/modules/common/database/database-service.interface';
import { JwtProviderMock } from '@/modules/common/jwt/__MOCKS__/jwt-provider.mock';
import { IJwtProvider } from '@/modules/common/jwt/jwt-provider.interface';
import { UserEntity } from '@/modules/users/entities/users.entity';
import { TemplateEngineProviderMock } from '@/modules/users/providers/template-engine/__MOCKS__/template-engine-provider.mock';
import { ITemplateEngineProvider } from '@/modules/users/providers/template-engine/template-engine-provider.interface';
import { MailServiceMock } from '@/modules/users/services/mail/__MOCKS__/mail-service.mock';
import { IMailService } from '@/modules/users/services/mail/mail-service.interface';

describe('SendPasswordRecoveryEmailUseCase unit tests', () => {
  let sut: SendPasswordRecoveryEmailUseCase;
  let databaseService: IDatabaseService;
  let templateProvider: ITemplateEngineProvider;
  let jwtProvider: IJwtProvider;
  let mailService: IMailService;

  beforeEach(() => {
    databaseService = new DatabaseServiceMock();
    templateProvider = new TemplateEngineProviderMock();
    jwtProvider = new JwtProviderMock();
    mailService = new MailServiceMock();
    sut = new SendPasswordRecoveryEmailUseCase(
      databaseService,
      jwtProvider,
      templateProvider,
      mailService,
    );
  });

  it('Should throw a NotFoundException when user is not found', async () => {
    const findByEmailSpy = jest.spyOn(databaseService.users, 'findByEmail');
    findByEmailSpy.mockResolvedValue(null);

    await expect(() =>
      sut.execute({ email: faker.internet.email() }),
    ).rejects.toBeInstanceOf(NotFoundException);

    expect(findByEmailSpy).toHaveBeenCalled();
  });

  it('Should throw a UnauthorizedException when user email is not verified', async () => {
    const user = { id: 'userId', email_is_verified: false } as UserEntity;

    const findByEmailSpy = jest.spyOn(databaseService.users, 'findByEmail');
    findByEmailSpy.mockResolvedValue(user);

    await expect(() =>
      sut.execute({ email: faker.internet.email() }),
    ).rejects.toBeInstanceOf(UnauthorizedException);

    expect(findByEmailSpy).toHaveBeenCalled();
  });

  it('Should create a jwt of type PasswordRecoveryJwtPayload', async () => {
    const user = { id: 'userId', email_is_verified: true } as UserEntity;

    const findByEmailSpy = jest.spyOn(databaseService.users, 'findByEmail');
    findByEmailSpy.mockResolvedValue(user);
    const signJwtSpy = jest.spyOn(jwtProvider, 'sign');

    const payload: PasswordRecoveryJwtPayload = {
      token_type: TOKEN_TYPE.PASSWORD_RECOVERY,
      userId: user.id,
    };

    await sut.execute({ email: faker.internet.email() });
    expect(findByEmailSpy).toHaveBeenCalled();
    expect(signJwtSpy).toHaveBeenCalledWith({ payload, expiresIn: 1200 });
  });

  it('Should send an email with the provided html template', async () => {
    const user = {
      id: 'userId',
      name: faker.internet.userName(),
      email_is_verified: true,
    } as UserEntity;

    const input = { email: faker.internet.email() };

    const findByEmailSpy = jest.spyOn(databaseService.users, 'findByEmail');
    findByEmailSpy.mockResolvedValue(user);
    const signJwtSpy = jest.spyOn(jwtProvider, 'sign');
    const compileTemplateSpy = jest.spyOn(templateProvider, 'compile');
    const sendMailSpy = jest.spyOn(mailService, 'sendMail');

    const payload: PasswordRecoveryJwtPayload = {
      token_type: TOKEN_TYPE.PASSWORD_RECOVERY,
      userId: user.id,
    };

    await sut.execute(input);

    const token = await signJwtSpy.mock.results[0].value;
    const html = await compileTemplateSpy.mock.results[0].value;

    const recoveryPasswordUrl = `http://example?token=${token}`;

    expect(findByEmailSpy).toHaveBeenCalled();
    expect(signJwtSpy).toHaveBeenCalledWith({ payload, expiresIn: 1200 });
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
