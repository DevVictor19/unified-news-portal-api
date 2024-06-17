import { faker } from '@faker-js/faker';
import { NestApplication } from '@nestjs/core';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';

import {
  SubjectMongoEntity,
  SubjectMongoModel,
} from '../../../../models/mongo/subjects-mongo.model';
import { SubjectsMongoRepository } from '../../subjects-mongo.repository';

import { AppModule } from '@/app.module';
import { SubjectEntity } from '@/modules/subjects/domain/entities/subjects.entity';

describe('SubjectsMongoRepository integration tests', () => {
  const collectionName = 'subjects';

  let app: NestApplication;
  let connection: Connection;
  let sut: SubjectsMongoRepository;
  let entity: SubjectEntity;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    connection = app.get<Connection>(getConnectionToken());
    await connection.collection(collectionName).deleteMany();
  });

  beforeEach(() => {
    const subjectsModel = app.get<typeof SubjectMongoModel>(
      getModelToken(SubjectMongoEntity.name),
    );

    sut = new SubjectsMongoRepository(subjectsModel);

    entity = new SubjectEntity({
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
