import { faker } from '@faker-js/faker';
import { NestApplication } from '@nestjs/core';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';

import {
  UserMongoEntity,
  UserMongoModel,
} from '../../../../models/mongo/users-mongo.model';
import { UsersMongoRepository } from '../../users-mongo.repository';

import { AppModule } from '@/app.module';
import { UserEntity } from '@/modules/users/domain/entities/users.entity';
describe('UsersMongoRepository integration tests', () => {
  const collectionName = 'users';

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
    await connection.collection(collectionName).deleteMany();
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
    await connection.collection(collectionName).deleteMany();
    app.close();
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
