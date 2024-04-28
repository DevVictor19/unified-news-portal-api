import { faker } from '@faker-js/faker';

import { CourseMongoEntityMapper } from '../../courses-mongo-model.mapper';
import { CourseMongoEntity, CourseMongoModel } from '../../courses-mongo.model';

import { CourseEntity } from '@/modules/courses/domain/entities/courses.entity';

describe('CourseMongoEntityMapper integration tests', () => {
  let sut: CourseMongoEntityMapper;
  let domainEntity: CourseEntity;
  let databaseEntity: CourseMongoEntity;

  beforeEach(() => {
    sut = new CourseMongoEntityMapper();

    domainEntity = new CourseEntity({
      name: faker.internet.userName(),
    });

    databaseEntity = new CourseMongoModel(domainEntity);
  });

  it('Should transform a domain entity into a database entity', () => {
    const spy = jest.spyOn(sut, 'toDatabaseEntity');

    const result = sut.toDatabaseEntity(domainEntity);

    expect(spy).toHaveBeenCalledWith(domainEntity);
    expect(result).toBeInstanceOf(CourseMongoModel);
  });

  it('Should transform a database entity into a domain entity', () => {
    const spy = jest.spyOn(sut, 'toDomainEntity');

    const result = sut.toDomainEntity(databaseEntity);

    expect(spy).toHaveBeenCalledWith(databaseEntity);
    expect(result).toBeInstanceOf(CourseEntity);
  });
});
