import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';

import { SignupUserUseCase } from '../../signup-user.usecase';

import { User } from '@/modules/users/entities/users.entity';
import { UsersFactory } from '@/modules/users/entities/users.factory';
import { IHashProvider } from '@/modules/users/providers/hash-provider.interface';
import { BcryptHashProvider } from '@/modules/users/providers/implementations/bcrypt-hash.provider';
import { UsersInMemoryRepository } from '@/modules/users/repositories/implementations/users-in-memory.repository';
import { IUsersRepository } from '@/modules/users/repositories/users-repository.interface';

describe('SignupUserUseCase unit tests', () => {
  let sut: SignupUserUseCase;
  let repository: IUsersRepository;
  let factory: UsersFactory;
  let hashProvider: IHashProvider;
  let payload: any;

  beforeEach(() => {
    payload = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
    };
    repository = new UsersInMemoryRepository();
    factory = new UsersFactory();
    hashProvider = new BcryptHashProvider();
    sut = new SignupUserUseCase(repository, factory, hashProvider);
  });

  it('Should create and save a user with hashed password', async () => {
    const repositoryFindByEmailSpy = jest.spyOn(repository, 'findByEmail');
    repositoryFindByEmailSpy.mockResolvedValue(null);
    const hashProviderSpy = jest.spyOn(hashProvider, 'generateHash');
    const factorySpy = jest.spyOn(factory, 'create');
    const repositoryInsertSpy = jest.spyOn(repository, 'insert');

    await sut.execute(payload);

    const hashedPassword = await hashProviderSpy.mock.results[0].value;
    const user = await factorySpy.mock.results[0].value;

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
