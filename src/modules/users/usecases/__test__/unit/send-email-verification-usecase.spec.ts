import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';

import { SendEmailVerificationUseCase } from '../../send-email-verification.usecase';

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

describe('SendEmailVerificationUseCase unit tests', () => {
  let sut: SendEmailVerificationUseCase;
  let repository: IUsersRepository;
  let templateProvider: ITemplateEngineProvider;
  let jwtProvider: IJwtProvider;
  let mailProvider: IMailProvider;
  let serverUrl: string;

  beforeEach(() => {
    repository = new UsersInMemoryRepository();
    templateProvider = new TemplateEngineProviderMock();
    jwtProvider = new JwtProviderMock();
    mailProvider = new MailProviderMock();
    serverUrl = 'server url';
    sut = new SendEmailVerificationUseCase(
      repository,
      templateProvider,
      mailProvider,
      jwtProvider,
      serverUrl,
    );
  });

  it('Should throw a BadRequestException if email is not registered', async () => {
    await expect(() =>
      sut.execute({ email: faker.internet.email() }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('Should throw a BadRequestException if email is already verified', async () => {
    const findByEmailSpy = jest.spyOn(repository, 'findByEmail');
    findByEmailSpy.mockResolvedValue({ email_is_verified: true } as User);

    await expect(() =>
      sut.execute({ email: faker.internet.email() }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('Should create a jwt token with user email as payload', async () => {
    const findByEmailSpy = jest.spyOn(repository, 'findByEmail');
    findByEmailSpy.mockResolvedValue({ email_is_verified: false } as User);
    const signTokenSpy = jest.spyOn(jwtProvider, 'sign');

    const email = faker.internet.email();

    await sut.execute({ email });

    expect(signTokenSpy).toHaveBeenCalledWith({
      payload: { email, token_type: TOKEN_TYPE.EMAIL_VERIFY },
      expiresIn: '2h',
    });
  });

  it('Should send a verification email with a url for verify', async () => {
    const user = {
      name: 'username',
      email_is_verified: false,
    } as User;

    const findByEmailSpy = jest.spyOn(repository, 'findByEmail');
    findByEmailSpy.mockResolvedValue(user);
    const signJwtSpy = jest.spyOn(jwtProvider, 'sign');
    const compileTemplateSpy = jest.spyOn(templateProvider, 'compile');
    const sendEmailSpy = jest.spyOn(mailProvider, 'sendMail');

    const email = faker.internet.email();

    await sut.execute({ email });

    const token = await signJwtSpy.mock.results[0].value;
    const link = `${serverUrl}/users/verify?token=${token}`;
    const html = await compileTemplateSpy.mock.results[0].value;

    expect(compileTemplateSpy).toHaveBeenCalledWith('email-verification.hbs', {
      link,
    });
    expect(sendEmailSpy).toHaveBeenCalledWith({
      body: html,
      subject: 'Verificação de Email',
      to: {
        email,
        name: user.name,
      },
    });
  });
});
