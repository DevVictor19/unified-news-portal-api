import { faker } from '@faker-js/faker';
import { NestApplication } from '@nestjs/core';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import {
  CategoryMongoEntity,
  CategoryMongoModel,
} from '../../../../models/mongo/categories-mongo.model';
import { CategoriesMongoRepository } from '../../categories-mongo.repository';

import { CategoryEntity } from '@/modules/categories/domain/entities/categories.entity';
import { createIntegrationTestAppSetup } from '@/testing/helpers/create-integration-test-app-setup';

describe('CategoriesMongoRepository integration tests', () => {
  const collectionName = 'categories';

  let app: NestApplication;
  let connection: Connection;
  let sut: CategoriesMongoRepository;
  let entity: CategoryEntity;

  beforeAll(async () => {
    app = await createIntegrationTestAppSetup();
    await app.init();

    connection = app.get<Connection>(getConnectionToken());
    await connection.collection(collectionName).deleteMany();
  });

  beforeEach(() => {
    const subjectsModel = app.get<typeof CategoryMongoModel>(
      getModelToken(CategoryMongoEntity.name),
    );

    sut = new CategoriesMongoRepository(subjectsModel);

    entity = new CategoryEntity({
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
