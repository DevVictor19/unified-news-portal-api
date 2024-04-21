import { faker } from '@faker-js/faker';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

import { ITemplateEngineProvider } from '../../../providers/template-engine-provider.interface';
import { IMailService } from '../../../services/mail-service.interface';
import { SendPasswordRecoveryEmailUseCase } from '../../send-password-recovery-email.usecase';

import { TOKEN_TYPE } from '@/common/domain/enums/token-type.enum';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';
import { PasswordRecoveryJwtPayload } from '@/modules/common/jwt/application/@types/jwt';
import { IJwtProvider } from '@/modules/common/jwt/application/providers/jwt-provider.interface';
import { JwtProviderMock } from '@/modules/common/jwt/infrastructure/__MOCKS__/jwt-provider.mock';
import { UserEntity } from '@/modules/users/domain/entities/users.entity';
import { TemplateEngineProviderMock } from '@/modules/users/infrastructure/providers/template-engine/__MOCKS__/template-engine-provider.mock';
import { MailServiceMock } from '@/modules/users/infrastructure/services/mail/__MOCKS__/mail-service.mock';

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
