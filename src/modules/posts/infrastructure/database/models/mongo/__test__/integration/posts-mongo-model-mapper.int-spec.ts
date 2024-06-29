import { faker } from '@faker-js/faker';

import { PostsMongoEntityMapper } from '../../posts-mongo-model.mapper';
import { PostsMongoEntity, PostsMongoModel } from '../../posts-mongo.model';

import { PostsEntity } from '@/modules/posts/domain/entities/posts.entity';

describe('PostMongoEntityMapper integration tests', () => {
  let sut: PostsMongoEntityMapper;
  let domainEntity: PostsEntity;
  let databaseEntity: PostsMongoEntity;

  beforeEach(() => {
    sut = new PostsMongoEntityMapper();

    domainEntity = new PostsEntity({
      author: faker.internet.userName(),
      text: faker.lorem.paragraph(),
      title: faker.lorem.sentence(),
      user_id: faker.database.mongodbObjectId(),
      categories: [faker.lorem.word()],
      classes: [faker.lorem.word()],
      courses: [faker.lorem.word()],
      subjects: [faker.lorem.word()],
    });

    databaseEntity = new PostsMongoModel(databaseEntity);
  });

  it('Should transform a domain entity into a database entity', () => {
    const spy = jest.spyOn(sut, 'toDatabaseEntity');

    const result = sut.toDatabaseEntity(domainEntity);

    expect(spy).toHaveBeenCalledWith(domainEntity);
    expect(result).toBeInstanceOf(PostsMongoModel);
  });

  it('Should transform a database entity into a domain entity', () => {
    const spy = jest.spyOn(sut, 'toDomainEntity');

    const result = sut.toDomainEntity(databaseEntity);

    expect(spy).toHaveBeenCalledWith(databaseEntity);
    expect(result).toBeInstanceOf(PostsEntity);
  });
});
