import { faker } from '@faker-js/faker';
import { NestApplication } from '@nestjs/core';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';

import {
  CourseMongoEntity,
  CourseMongoModel,
  CourseMongoSchema,
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

  describe('search', () => {
    const entities: CourseMongoEntity[] = [];

    beforeAll(async () => {
      const subjectsModel = connection.model(
        getModelToken(CourseMongoEntity.name),
        CourseMongoSchema,
      );

      // insert 15 entities on collection
      for (let i = 0; i < 15; i++) {
        entities.push(
          new subjectsModel({
            _id: i.toString(),
            name: faker.internet.userName(),
          }),
        );
      }

      await subjectsModel.insertMany(entities);
    });

    afterAll(async () => {
      await connection.collection(collectionName).deleteMany();
    });

    it('Should search entities with the provided limitPerPage', async () => {
      const limit = 10;

      const results = await sut.search({ limitPerPage: limit, pageNumber: 1 });

      expect(results.length).toBe(limit);
    });

    it('Should search entities with the provided pageNumber', async () => {
      const results = await sut.search({ limitPerPage: 10, pageNumber: 2 });

      expect(results.length).toBe(5);
    });

    it('Should search entities with the provided searchTerm', async () => {
      const results = await sut.search({
        limitPerPage: 15,
        pageNumber: 1,
        searchTerm: entities[0].name,
      });

      expect(results).toBeTruthy();
      expect(results[0].id).toBe(entities[0]._id);
    });
  });

  describe('insert', () => {
    it('Should insert a entity', async () => {
      await sut.insert(entity);

      const insertedEntity = await connection
        .model(getModelToken(CourseMongoEntity.name), CourseMongoSchema)
        .findById(entity.id);

      expect(insertedEntity).toBeTruthy();
      expect(insertedEntity?._id).toBe(entity.id);
    });
  });

  describe('findAll', () => {
    it('Should find all entities', async () => {
      await sut.insert(entity);

      const entities = await sut.findAll();

      expect(entities.length).toBeGreaterThan(0);
    });
  });

  describe('findById', () => {
    it('Should find a entity by id', async () => {
      await sut.insert(entity);

      const insertedEntity = await sut.findById(entity.id);

      expect(insertedEntity).toBeTruthy();
      expect(insertedEntity?.id).toBe(entity.id);
    });
  });

  describe('update', () => {
    it('Should update a entity', async () => {
      await sut.insert(entity);

      entity.name = 'New name';

      await sut.update(entity.id, entity);

      const updatedEntity = (await connection
        .model(getModelToken(CourseMongoEntity.name), CourseMongoSchema)
        .findById(entity.id)) as CourseMongoEntity;

      expect(updatedEntity.name).toBe(entity.name);
    });
  });

  describe('delete', () => {
    it('Should delete a entity', async () => {
      await sut.insert(entity);

      await sut.delete(entity.id);

      const insertedEntity = await connection
        .model(getModelToken(CourseMongoEntity.name), CourseMongoSchema)
        .findById(entity.id);

      expect(insertedEntity).toBeNull();
    });
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
