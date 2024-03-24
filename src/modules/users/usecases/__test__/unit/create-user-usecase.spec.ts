import { faker } from '@faker-js/faker';

import { UsersFactory } from '@/modules/users/entities/users.factory';
import { UsersInMemoryRepository } from '@/modules/users/repositories/implementations/users-in-memory.repository';
import { CreateUserUseCase } from '@/modules/users/usecases';

describe('CreateUserUseCase unit tests', () => {
  let repository: UsersInMemoryRepository;
  let usersFactory: UsersFactory;
  let sut: CreateUserUseCase;

  beforeEach(() => {
    repository = new UsersInMemoryRepository();
    usersFactory = new UsersFactory();
    sut = new CreateUserUseCase(usersFactory, repository);
  });

  it('Should create a User', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');
    await sut.execute({
      email: faker.internet.email(),
      name: faker.internet.userName(),
      password: faker.internet.password(),
    });
    expect(spyInsert).toHaveBeenCalledTimes(1);
  });
});
