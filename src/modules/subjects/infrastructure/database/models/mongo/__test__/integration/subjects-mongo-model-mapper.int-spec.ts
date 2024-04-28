import { faker } from '@faker-js/faker';

import { SubjectMongoEntityMapper } from '../../subjects-mongo-model.mapper';
import {
  SubjectMongoEntity,
  SubjectMongoModel,
} from '../../subjects-mongo.model';

import { SubjectEntity } from '@/modules/subjects/domain/entities/subjects.entity';

describe('SubjectMongoEntityMapper integration tests', () => {
  let sut: SubjectMongoEntityMapper;
  let domainEntity: SubjectEntity;
  let databaseEntity: SubjectMongoEntity;

  beforeEach(() => {
    sut = new SubjectMongoEntityMapper();

    domainEntity = new SubjectEntity({
      name: faker.internet.userName(),
    });

    databaseEntity = new SubjectMongoModel(domainEntity);
  });

  it('Should transform a domain entity into a database entity', () => {
    const spy = jest.spyOn(sut, 'toDatabaseEntity');

    const result = sut.toDatabaseEntity(domainEntity);

    expect(spy).toHaveBeenCalledWith(domainEntity);
    expect(result).toBeInstanceOf(SubjectMongoModel);
  });

  it('Should transform a database entity into a domain entity', () => {
    const spy = jest.spyOn(sut, 'toDomainEntity');

    const result = sut.toDomainEntity(databaseEntity);

    expect(spy).toHaveBeenCalledWith(databaseEntity);
    expect(result).toBeInstanceOf(SubjectEntity);
  });
});
