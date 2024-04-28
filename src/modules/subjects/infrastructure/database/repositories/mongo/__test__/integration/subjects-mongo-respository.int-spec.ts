import { faker } from '@faker-js/faker';
import { NestApplication } from '@nestjs/core';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';

import {
  SubjectMongoEntity,
  SubjectMongoModel,
  SubjectMongoSchema,
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

  describe('search', () => {
    const entities: SubjectMongoEntity[] = [];

    beforeAll(async () => {
      const subjectsModel = connection.model(
        getModelToken(SubjectMongoEntity.name),
        SubjectMongoSchema,
      );

      // insert 15 entities on collection
      for (let i = 0; i < 15; i++) {
        entities.push(
          new subjectsModel({
            _id: i.toString(),
            name: `${i}`,
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
        .model(getModelToken(SubjectMongoEntity.name), SubjectMongoSchema)
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
        .model(getModelToken(SubjectMongoEntity.name), SubjectMongoSchema)
        .findById(entity.id)) as SubjectMongoEntity;

      expect(updatedEntity.name).toBe(entity.name);
    });
  });

  describe('delete', () => {
    it('Should delete a entity', async () => {
      await sut.insert(entity);

      await sut.delete(entity.id);

      const insertedEntity = await connection
        .model(getModelToken(SubjectMongoEntity.name), SubjectMongoSchema)
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
