import { faker } from '@faker-js/faker';
import { NestApplication } from '@nestjs/core';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import {
  PostTypeMongoEntity,
  PostTypeMongoModel,
} from '../../../../models/mongo/post-types-mongo.model';
import { PostTypesMongoRepository } from '../../post-types-mongo.repository';

import { PostTypeEntity } from '@/modules/post-types/domain/entities/post-types.entity';
import { createIntegrationTestAppSetup } from '@/testing/helpers/create-integration-test-app-setup';

describe('PostTypesMongoRepository integration tests', () => {
  const collectionName = 'post-types';

  let app: NestApplication;
  let connection: Connection;
  let sut: PostTypesMongoRepository;
  let entity: PostTypeEntity;

  beforeAll(async () => {
    app = await createIntegrationTestAppSetup();
    await app.init();

    connection = app.get<Connection>(getConnectionToken());
    await connection.collection(collectionName).deleteMany();
  });

  beforeEach(() => {
    const subjectsModel = app.get<typeof PostTypeMongoModel>(
      getModelToken(PostTypeMongoEntity.name),
    );

    sut = new PostTypesMongoRepository(subjectsModel);

    entity = new PostTypeEntity({
      name: faker.internet.userName(),
    });
  });

  afterAll(async () => {
    await connection.collection(collectionName).deleteMany();
    app.close();
  });

  describe('findByName', () => {
    it('Should find a entity by name', async () => {
      await sut.insert(entity);

      const result = await sut.findByName(entity.name);

      expect(result).toBeTruthy();
    });

    it('Should return null if entity not found', async () => {
      const result = await sut.findByName(entity.name);

      expect(result).toBeNull();
    });
  });
});
