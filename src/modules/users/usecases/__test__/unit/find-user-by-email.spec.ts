import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';

import { FindUserByEmailUseCase } from '../../find-user-by-email.usecase';

import { User } from '@/modules/users/entities/users.entity';
import { UsersInMemoryRepository } from '@/modules/users/repositories/implementations/users-in-memory.repository';

describe('FindUserByEmailUseCase unit tests', () => {
  let repository: UsersInMemoryRepository;
  let sut: FindUserByEmailUseCase;

  beforeEach(() => {
    repository = new UsersInMemoryRepository();
    sut = new FindUserByEmailUseCase(repository);
  });

  it('Should find a user with the provided email', async () => {
    const findByEmailSpy = jest.spyOn(repository, 'findByEmail');
    findByEmailSpy.mockResolvedValue({} as User);

    const email = faker.internet.email();
    await sut.execute({ email });

    expect(findByEmailSpy).toHaveBeenCalledTimes(1);
    expect(findByEmailSpy).toHaveBeenCalledWith(email);
  });

  it('Should throw when user is not found', async () => {
    await expect(() =>
      sut.execute({ email: faker.internet.email() }),
    ).rejects.toThrow(NotFoundException);
  });
});
