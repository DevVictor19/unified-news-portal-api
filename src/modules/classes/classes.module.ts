import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ClassesController } from './classes.controller';
import {
  ClassMongoEntity,
  ClassMongoSchema,
} from './database/models/mongo/classes-mongo.model';
import { CLASSES_REPOSITORY } from './database/repositories/classes-repository.constants';
import { IClassesRepository } from './database/repositories/classes-repository.interface';
import { ClassesMongoRepository } from './database/repositories/mongo/classes-mongo.repository';
import { ClassEntityFactory } from './entities/classes.factory';
import {
  CreateClassesUseCase,
  DeleteClassesUseCase,
  SearchClassesUseCase,
} from './usecases';

@Module({
  controllers: [ClassesController],
  imports: [
    MongooseModule.forFeature([
      { name: ClassMongoEntity.name, schema: ClassMongoSchema },
    ]),
  ],
  providers: [
    {
      provide: CLASSES_REPOSITORY,
      useFactory: (classModel: Model<ClassMongoEntity>) => {
        return new ClassesMongoRepository(classModel);
      },
      inject: [getModelToken(ClassMongoEntity.name)],
    },
    {
      provide: ClassEntityFactory,
      useClass: ClassEntityFactory,
    },
    {
      provide: CreateClassesUseCase,
      useFactory: (
        classEntityFactory: ClassEntityFactory,
        classesRepository: IClassesRepository,
      ) => {
        return new CreateClassesUseCase(classEntityFactory, classesRepository);
      },
      inject: [ClassEntityFactory, CLASSES_REPOSITORY],
    },
    {
      provide: DeleteClassesUseCase,
      useFactory: (classesRepository: IClassesRepository) => {
        return new DeleteClassesUseCase(classesRepository);
      },
      inject: [CLASSES_REPOSITORY],
    },
    {
      provide: SearchClassesUseCase,
      useFactory: (classesRepository: IClassesRepository) => {
        return new SearchClassesUseCase(classesRepository);
      },
      inject: [CLASSES_REPOSITORY],
    },
  ],
})
export class ClassesModule {}
