import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';

import { ITemplateEngineProvider } from '../../../providers/template-engine-provider.interface';
import { IMailService } from '../../../services/mail-service.interface';
import { SendEmailVerificationUseCase } from '../../send-email-verification.usecase';

import { TOKEN_TYPE } from '@/common/domain/enums/token-type.enum';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';
import { IEnvConfigProvider } from '@/modules/common/env-config/application/providers/env-config-provider.interface';
import { EnvConfigProviderMock } from '@/modules/common/env-config/infrastructure/__MOCKS__/env-config-provider.mock';
import { IJwtProvider } from '@/modules/common/jwt/application/providers/jwt-provider.interface';
import { JwtProviderMock } from '@/modules/common/jwt/infrastructure/__MOCKS__/jwt-provider.mock';
import { UserEntity } from '@/modules/users/domain/entities/users.entity';
import { TemplateEngineProviderMock } from '@/modules/users/infrastructure/providers/template-engine/__MOCKS__/template-engine-provider.mock';
import { MailServiceMock } from '@/modules/users/infrastructure/services/mail/__MOCKS__/mail-service.mock';

describe('SendEmailVerificationUseCase unit tests', () => {
  let sut: SendEmailVerificationUseCase;
  let databaseService: IDatabaseService;
  let templateProvider: ITemplateEngineProvider;
  let jwtProvider: IJwtProvider;
  let mailService: IMailService;
  let envConfigProvider: IEnvConfigProvider;

  beforeEach(() => {
    databaseService = new DatabaseServiceMock();
    templateProvider = new TemplateEngineProviderMock();
    jwtProvider = new JwtProviderMock();
    mailService = new MailServiceMock();
    envConfigProvider = new EnvConfigProviderMock();
    sut = new SendEmailVerificationUseCase(
      databaseService,
      templateProvider,
      mailService,
      jwtProvider,
      envConfigProvider,
    );
  });

  it('Should throw a BadRequestException if email is not registered', async () => {
    await expect(() =>
      sut.execute({ email: faker.internet.email() }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('Should throw a BadRequestException if email is already verified', async () => {
    const findByEmailSpy = jest.spyOn(databaseService.users, 'findByEmail');
    findByEmailSpy.mockResolvedValue({ email_is_verified: true } as UserEntity);

    await expect(() =>
      sut.execute({ email: faker.internet.email() }),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(findByEmailSpy).toHaveBeenCalled();
  });

  it('Should create a jwt token with user email as payload', async () => {
    const findByEmailSpy = jest.spyOn(databaseService.users, 'findByEmail');
    findByEmailSpy.mockResolvedValue({
      email_is_verified: false,
    } as UserEntity);
    const signTokenSpy = jest.spyOn(jwtProvider, 'sign');

    const email = faker.internet.email();

    await sut.execute({ email });

    expect(findByEmailSpy).toHaveBeenCalled();
    expect(signTokenSpy).toHaveBeenCalledWith({
      payload: { email, token_type: TOKEN_TYPE.EMAIL_VERIFY },
      expiresIn: '2h',
    });
  });

  it('Should send a verification email with a url for verify', async () => {
    const user = {
      name: 'username',
      email_is_verified: false,
    } as UserEntity;

    const findByEmailSpy = jest.spyOn(databaseService.users, 'findByEmail');
    findByEmailSpy.mockResolvedValue(user);
    const signJwtSpy = jest.spyOn(jwtProvider, 'sign');
    const compileTemplateSpy = jest.spyOn(templateProvider, 'compile');
    const sendEmailSpy = jest.spyOn(mailService, 'sendMail');

    const email = faker.internet.email();

    await sut.execute({ email });

    expect(findByEmailSpy).toHaveBeenCalled();
    expect(signJwtSpy).toHaveBeenCalled();
    expect(compileTemplateSpy).toHaveBeenCalled();
    expect(sendEmailSpy).toHaveBeenCalled();
  });
});
