import { faker } from '@faker-js/faker';

import { UserMongoEntityMapper } from '../../users-mongo-model.mapper';
import { UserMongoEntity, UserMongoModel } from '../../users-mongo.model';

import { UserEntity } from '@/modules/users/domain/entities/users.entity';

describe('UserMongoEntityMapper integration tests', () => {
  let sut: UserMongoEntityMapper;
  let domainEntity: UserEntity;
  let databaseEntity: UserMongoEntity;

  beforeEach(() => {
    sut = new UserMongoEntityMapper();

    domainEntity = new UserEntity({
      email: faker.internet.email(),
      name: faker.internet.userName(),
      password: faker.internet.password(),
    });

    databaseEntity = new UserMongoModel(domainEntity);
  });

  it('Should transform a domain entity into a database entity', () => {
    const spy = jest.spyOn(sut, 'toDatabaseEntity');

    const result = sut.toDatabaseEntity(domainEntity);

    expect(spy).toHaveBeenCalledWith(domainEntity);
    expect(result).toBeInstanceOf(UserMongoModel);
  });

  it('Should transform a database entity into a domain entity', () => {
    const spy = jest.spyOn(sut, 'toDomainEntity');

    const result = sut.toDomainEntity(databaseEntity);

    expect(spy).toHaveBeenCalledWith(databaseEntity);
    expect(result).toBeInstanceOf(UserEntity);
  });
});
