import { faker } from '@faker-js/faker';
import { NestApplication } from '@nestjs/core';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';

import {
  CourseMongoEntity,
  CourseMongoModel,
} from '../../../../models/mongo/courses-mongo.model';
import { CoursesMongoRepository } from '../../courses-mongo.repository';

import { AppModule } from '@/app.module';
import { CourseEntity } from '@/modules/courses/domain/entities/courses.entity';

describe('CoursesMongoRepository integration tests', () => {
  const collectionName = 'courses';

  let app: NestApplication;
  let connection: Connection;
  let sut: CoursesMongoRepository;
  let entity: CourseEntity;

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
    const subjectsModel = app.get<typeof CourseMongoModel>(
      getModelToken(CourseMongoEntity.name),
    );

    sut = new CoursesMongoRepository(subjectsModel);

    entity = new CourseEntity({
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
