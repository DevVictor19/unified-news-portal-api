import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Subject, SubjectSchema } from './entities/subjects.entity';
import { SubjectsFactory } from './entities/subjects.factory';
import { SubjectsMongoRepository } from './repositories/mongo/subjects-mongo.repository';
import { SUBJECTS_REPOSITORY } from './repositories/subjects-repository.constants';
import { ISubjectsRepository } from './repositories/subjects-repository.interface';
import { SubjectsController } from './subjects.controller';
import { CreateSubjectsUseCase } from './usecases';

@Module({
  controllers: [SubjectsController],
  imports: [
    MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema }]),
  ],
  providers: [
    {
      provide: SUBJECTS_REPOSITORY,
      useFactory: (subjectModel: Model<Subject>) => {
        return new SubjectsMongoRepository(subjectModel);
      },
      inject: [getModelToken(Subject.name)],
    },
    {
      provide: SubjectsFactory,
      useClass: SubjectsFactory,
    },
    {
      provide: CreateSubjectsUseCase,
      useFactory: (
        subjectsFactory: SubjectsFactory,
        subjectsRepository: ISubjectsRepository,
      ) => {
        return new CreateSubjectsUseCase(subjectsFactory, subjectsRepository);
      },
      inject: [SubjectsFactory, SUBJECTS_REPOSITORY],
    },
  ],
})
export class SubjectsModule {}
