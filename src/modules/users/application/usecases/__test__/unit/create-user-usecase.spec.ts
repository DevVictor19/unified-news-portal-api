import { faker } from '@faker-js/faker';

import { IHashProvider } from '../../../providers/hash-provider.interface';
import { CreateUserUseCase } from '../../create-user.usecase';

import { EmailInUseError } from '@/common/application/errors/application-errors'; // Import the correct error
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';
import { DatabaseServiceMock } from '@/modules/common/database/infrastructure/__MOCKS__/database-service.mock';
import { UserEntity } from '@/modules/users/domain/entities/users.entity';
import { HashProviderMock } from '@/modules/users/infrastructure/providers/hash/__MOCKS__/hash-provider.mock';

describe('CreateUserUseCase unit tests', () => {
  let sut: CreateUserUseCase;
  let databaseService: IDatabaseService;
  let hashProvider: IHashProvider;
  let payload: any;

  beforeEach(() => {
    payload = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
    };
    databaseService = new DatabaseServiceMock();
    hashProvider = new HashProviderMock();
    sut = new CreateUserUseCase(databaseService, hashProvider);
  });

  it('Should create and save a user with hashed password', async () => {
    const repositoryFindByEmailSpy = jest.spyOn(
      databaseService.users,
      'findByEmail',
    );
    const hashProviderSpy = jest.spyOn(hashProvider, 'generateHash');
    const repositoryInsertSpy = jest.spyOn(databaseService.users, 'insert');

    await sut.execute(payload);

    expect(repositoryFindByEmailSpy).toHaveBeenCalledWith(payload.email);
    expect(hashProviderSpy).toHaveBeenCalledWith(payload.password);
    expect(repositoryInsertSpy).toHaveBeenCalled();
  });

  it('Should throw an EmailInUseError if email is already in use', async () => {
    const repositoryFindByEmailSpy = jest.spyOn(
      databaseService.users,
      'findByEmail',
    );
    repositoryFindByEmailSpy.mockResolvedValue({} as UserEntity);

    await expect(() => sut.execute(payload)).rejects.toBeInstanceOf(
      EmailInUseError,
    );
  });
});
