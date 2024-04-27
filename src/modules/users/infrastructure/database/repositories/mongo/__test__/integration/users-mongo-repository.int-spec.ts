import { faker } from '@faker-js/faker';
import { NestApplication } from '@nestjs/core';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';

import {
  UserMongoEntity,
  UserMongoModel,
  UserMongoSchema,
} from '../../../../models/mongo/users-mongo.model';
import { UsersMongoRepository } from '../../users-mongo.repository';

import { AppModule } from '@/app.module';
import { UserEntity } from '@/modules/users/domain/entities/users.entity';
describe('UsersMongoRepository integration tests', () => {
  let app: NestApplication;
  let connection: Connection;
  let sut: UsersMongoRepository;
  let entity: UserEntity;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    connection = app.get<Connection>(getConnectionToken());
    await connection.collection('users').deleteMany();
  });

  beforeEach(() => {
    const usersModel = app.get<typeof UserMongoModel>(
      getModelToken(UserMongoEntity.name),
    );

    sut = new UsersMongoRepository(usersModel);

    entity = new UserEntity({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  });

  afterAll(async () => {
    await connection.collection('users').deleteMany();
    app.close();
  });

  describe('insert', () => {
    it('Should insert a entity', async () => {
      await sut.insert(entity);

      const insertedEntity = await connection
        .model(getModelToken(UserMongoEntity.name), UserMongoSchema)
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
        .model(getModelToken(UserMongoEntity.name), UserMongoSchema)
        .findById(entity.id)) as UserMongoEntity;

      expect(updatedEntity.name).toBe(entity.name);
    });
  });

  describe('delete', () => {
    it('Should delete a entity', async () => {
      await sut.insert(entity);

      await sut.delete(entity.id);

      const insertedEntity = await connection
        .model(getModelToken(UserMongoEntity.name), UserMongoSchema)
        .findById(entity.id);

      expect(insertedEntity).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('Should find a entity by email', async () => {
      await sut.insert(entity);

      const result = await sut.findByEmail(entity.email);

      expect(result).toBeTruthy();
    });

    it('Should return null if entity not found', async () => {
      const result = await sut.findByEmail(entity.email);

      expect(result).toBeNull();
    });
  });
});
