import { faker } from '@faker-js/faker';

import { PostTypeMongoEntityMapper } from '../../post-types-mongo-model.mapper';
import {
  PostTypeMongoEntity,
  PostTypeMongoModel,
} from '../../post-types-mongo.model';

import { PostTypeEntity } from '@/modules/post-types/domain/entities/post-types.entity';

describe('PostTypeMongoEntityMapper integration tests', () => {
  let sut: PostTypeMongoEntityMapper;
  let domainEntity: PostTypeEntity;
  let databaseEntity: PostTypeMongoEntity;

  beforeEach(() => {
    sut = new PostTypeMongoEntityMapper();

    domainEntity = new PostTypeEntity({
      name: faker.internet.userName(),
    });

    databaseEntity = new PostTypeMongoModel(domainEntity);
  });

  it('Should transform a domain entity into a database entity', () => {
    const spy = jest.spyOn(sut, 'toDatabaseEntity');

    const result = sut.toDatabaseEntity(domainEntity);

    expect(spy).toHaveBeenCalledWith(domainEntity);
    expect(result).toBeInstanceOf(PostTypeMongoModel);
  });

  it('Should transform a database entity into a domain entity', () => {
    const spy = jest.spyOn(sut, 'toDomainEntity');

    const result = sut.toDomainEntity(databaseEntity);

    expect(spy).toHaveBeenCalledWith(databaseEntity);
    expect(result).toBeInstanceOf(PostTypeEntity);
  });
});
