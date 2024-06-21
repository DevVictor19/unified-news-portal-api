import { faker } from '@faker-js/faker';
import { NestApplication } from '@nestjs/core';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import {
  ClassMongoEntity,
  ClassMongoModel,
} from '../../../../models/mongo/classes-mongo.model';
import { ClassesMongoRepository } from '../../classes-mongo.repository';

import { ClassEntity } from '@/modules/classes/domain/entities/classes.entity';
import { createIntegrationTestAppSetup } from '@/testing/helpers/create-integration-test-app-setup';

describe('ClassesMongoRepository integration tests', () => {
  const collectionName = 'classes';

  let app: NestApplication;
  let connection: Connection;
  let sut: ClassesMongoRepository;
  let entity: ClassEntity;

  beforeAll(async () => {
    app = await createIntegrationTestAppSetup();
    await app.init();

    connection = app.get<Connection>(getConnectionToken());
    await connection.collection(collectionName).deleteMany();
  });

  beforeEach(() => {
    const subjectsModel = app.get<typeof ClassMongoModel>(
      getModelToken(ClassMongoEntity.name),
    );

    sut = new ClassesMongoRepository(subjectsModel);

    entity = new ClassEntity({
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
