import { faker } from '@faker-js/faker';

import { ClassMongoEntityMapper } from '../../classes-mongo-model.mapper';
import { ClassMongoEntity, ClassMongoModel } from '../../classes-mongo.model';

import { ClassEntity } from '@/modules/classes/domain/entities/classes.entity';

describe('ClassMongoEntityMapper integration tests', () => {
  let sut: ClassMongoEntityMapper;
  let domainEntity: ClassEntity;
  let databaseEntity: ClassMongoEntity;

  beforeEach(() => {
    sut = new ClassMongoEntityMapper();

    domainEntity = new ClassEntity({
      name: faker.internet.userName(),
    });

    databaseEntity = new ClassMongoModel(domainEntity);
  });

  it('Should transform a domain entity into a database entity', () => {
    const spy = jest.spyOn(sut, 'toDatabaseEntity');

    const result = sut.toDatabaseEntity(domainEntity);

    expect(spy).toHaveBeenCalledWith(domainEntity);
    expect(result).toBeInstanceOf(ClassMongoModel);
  });

  it('Should transform a database entity into a domain entity', () => {
    const spy = jest.spyOn(sut, 'toDomainEntity');

    const result = sut.toDomainEntity(databaseEntity);

    expect(spy).toHaveBeenCalledWith(databaseEntity);
    expect(result).toBeInstanceOf(ClassEntity);
  });
});
