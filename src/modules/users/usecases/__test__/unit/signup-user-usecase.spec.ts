import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';

import { SignupUserUseCase } from '../../signup-user.usecase';

import { User } from '@/modules/users/entities/users.entity';
import { UsersFactory } from '@/modules/users/entities/users.factory';
import { HashProviderMock } from '@/modules/users/providers/hash/__MOCKS__/hash-provider.mock';
import { IHashProvider } from '@/modules/users/providers/hash/hash-provider.interface';
import { JwtProviderMock } from '@/modules/users/providers/jwt/__MOCKS__/jwt-provider.mock';
import { IJwtProvider } from '@/modules/users/providers/jwt/jwt-provider.interface';
import { MailProviderMock } from '@/modules/users/providers/mail/__MOCKS__/mail-provider.mock';
import { IMailProvider } from '@/modules/users/providers/mail/mail-provider.interface';
import { TemplateEngineProviderMock } from '@/modules/users/providers/template-engine/__MOCKS__/template-engine-provider.mock';
import { ITemplateEngineProvider } from '@/modules/users/providers/template-engine/template-engine-provider.interface';
import { UsersInMemoryRepository } from '@/modules/users/repositories/in-memory/users-in-memory.repository';
import { IUsersRepository } from '@/modules/users/repositories/users-repository.interface';

describe('SignupUserUseCase unit tests', () => {
  let sut: SignupUserUseCase;
  let repository: IUsersRepository;
  let factory: UsersFactory;
  let hashProvider: IHashProvider;
  let templateProvider: ITemplateEngineProvider;
  let jwtProvider: IJwtProvider;
  let mailProvider: IMailProvider;
  let serverUrl: string;
  let payload: any;

  beforeEach(() => {
    payload = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
    };
    repository = new UsersInMemoryRepository();
    factory = new UsersFactory();
    hashProvider = new HashProviderMock();
    templateProvider = new TemplateEngineProviderMock();
    jwtProvider = new JwtProviderMock();
    mailProvider = new MailProviderMock();
    serverUrl = 'server url';
    sut = new SignupUserUseCase(
      repository,
      factory,
      hashProvider,
      templateProvider,
      jwtProvider,
      mailProvider,
      serverUrl,
    );
  });

  it('Should create and save a user with hashed password', async () => {
    const repositoryFindByEmailSpy = jest.spyOn(repository, 'findByEmail');
    const hashProviderSpy = jest.spyOn(hashProvider, 'generateHash');
    const factorySpy = jest.spyOn(factory, 'create');
    const repositoryInsertSpy = jest.spyOn(repository, 'insert');

    await sut.execute(payload);

    const hashedPassword = await hashProviderSpy.mock.results[0].value;
    const user = await factorySpy.mock.results[0].value;

    expect(repositoryFindByEmailSpy).toHaveBeenCalledWith(payload.email);
    expect(hashProviderSpy).toHaveBeenCalledWith(payload.password);
    expect(factorySpy).toHaveBeenCalledWith({
      email: payload.email,
      name: payload.name,
      password: hashedPassword,
    });
    expect(repositoryInsertSpy).toHaveBeenCalledWith(user);
  });

  it('Should throw a BadRequestException if email is already in use', async () => {
    const repositoryFindByEmailSpy = jest.spyOn(repository, 'findByEmail');
    repositoryFindByEmailSpy.mockResolvedValue({} as User);

    await expect(() => sut.execute(payload)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
