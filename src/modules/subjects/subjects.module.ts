import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Subject, SubjectSchema } from './entities/subjects.entity';
import { SubjectsFactory } from './entities/subjects.factory';
import { SubjectsMongoRepository } from './repositories/mongo/subjects-mongo.repository';
import { SUBJECTS_REPOSITORY } from './repositories/subjects-repository.constants';
import { SubjectsController } from './subjects.controller';

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
  ],
})
export class SubjectsModule {}
