import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  SubjectMongoEntity,
  SubjectMongoSchema,
} from './database/models/mongo/subjects-mongo.model';
import { SubjectsMongoRepository } from './database/repositories/mongo/subjects-mongo.repository';
import { SUBJECTS_REPOSITORY } from './database/repositories/subjects-repository.constants';
import { ISubjectsRepository } from './database/repositories/subjects-repository.interface';
import { SubjectEntityFactory } from './entities/subjects.factory';
import { SubjectsController } from './subjects.controller';
import { CreateSubjectsUseCase, SearchSubjectsUseCase } from './usecases';

@Module({
  controllers: [SubjectsController],
  imports: [
    MongooseModule.forFeature([
      { name: SubjectMongoEntity.name, schema: SubjectMongoSchema },
    ]),
  ],
  providers: [
    {
      provide: SUBJECTS_REPOSITORY,
      useFactory: (subjectModel: Model<SubjectMongoEntity>) => {
        return new SubjectsMongoRepository(subjectModel);
      },
      inject: [getModelToken(SubjectMongoEntity.name)],
    },
    {
      provide: SubjectEntityFactory,
      useClass: SubjectEntityFactory,
    },
    {
      provide: CreateSubjectsUseCase,
      useFactory: (
        subjectsFactory: SubjectEntityFactory,
        subjectsRepository: ISubjectsRepository,
      ) => {
        return new CreateSubjectsUseCase(subjectsFactory, subjectsRepository);
      },
      inject: [SubjectEntityFactory, SUBJECTS_REPOSITORY],
    },
    {
      provide: SearchSubjectsUseCase,
      useFactory: (subjectsRepository: ISubjectsRepository) => {
        return new SearchSubjectsUseCase(subjectsRepository);
      },
      inject: [SUBJECTS_REPOSITORY],
    },
  ],
})
export class SubjectsModule {}
