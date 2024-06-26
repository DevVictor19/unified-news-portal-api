import { faker } from '@faker-js/faker';

import { CategoryMongoEntityMapper } from '../../categories-mongo-model.mapper';
import {
  CategoryMongoEntity,
  CategoryMongoModel,
} from '../../categories-mongo.model';

import { CategoryEntity } from '@/modules/categories/domain/entities/categories.entity';

describe('ClassMongoEntityMapper integration tests', () => {
  let sut: CategoryMongoEntityMapper;
  let domainEntity: CategoryEntity;
  let databaseEntity: CategoryMongoEntity;

  beforeEach(() => {
    sut = new CategoryMongoEntityMapper();

    domainEntity = new CategoryEntity({
      name: faker.internet.userName(),
    });

    databaseEntity = new CategoryMongoModel(domainEntity);
  });

  it('Should transform a domain entity into a database entity', () => {
    const spy = jest.spyOn(sut, 'toDatabaseEntity');

    const result = sut.toDatabaseEntity(domainEntity);

    expect(spy).toHaveBeenCalledWith(domainEntity);
    expect(result).toBeInstanceOf(CategoryMongoModel);
  });

  it('Should transform a database entity into a domain entity', () => {
    const spy = jest.spyOn(sut, 'toDomainEntity');

    const result = sut.toDomainEntity(databaseEntity);

    expect(spy).toHaveBeenCalledWith(databaseEntity);
    expect(result).toBeInstanceOf(CategoryEntity);
  });
});
