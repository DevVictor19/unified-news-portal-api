import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CoursesController } from './courses.controller';
import {
  CourseMongoEntity,
  CourseMongoSchema,
} from './database/models/mongo/courses-mongo.model';
import { COURSES_REPOSITORY } from './database/repositories/courses-repository.constants';
import { ICoursesRepository } from './database/repositories/courses-repository.interface';
import { CoursesMongoRepository } from './database/repositories/mongo/courses-mongo.repository';
import { CourseEntityFactory } from './entities/courses.factory';
import {
  CreateCoursesUseCase,
  DeleteCoursesUseCase,
  SearchCoursesUseCase,
} from './usecases';

@Module({
  controllers: [CoursesController],
  imports: [
    MongooseModule.forFeature([
      { name: CourseMongoEntity.name, schema: CourseMongoSchema },
    ]),
  ],
  providers: [
    {
      provide: COURSES_REPOSITORY,
      useFactory: (courseModel: Model<CourseMongoEntity>) => {
        return new CoursesMongoRepository(courseModel);
      },
      inject: [getModelToken(CourseMongoEntity.name)],
    },
    {
      provide: CourseEntityFactory,
      useClass: CourseEntityFactory,
    },
    {
      provide: CreateCoursesUseCase,
      useFactory: (
        courseEntityFactory: CourseEntityFactory,
        coursesRepository: ICoursesRepository,
      ) => {
        return new CreateCoursesUseCase(courseEntityFactory, coursesRepository);
      },
      inject: [CourseEntityFactory, COURSES_REPOSITORY],
    },
    {
      provide: DeleteCoursesUseCase,
      useFactory: (coursesRepository: ICoursesRepository) => {
        return new DeleteCoursesUseCase(coursesRepository);
      },
      inject: [COURSES_REPOSITORY],
    },
    {
      provide: SearchCoursesUseCase,
      useFactory: (coursesRepository: ICoursesRepository) => {
        return new SearchCoursesUseCase(coursesRepository);
      },
      inject: [COURSES_REPOSITORY],
    },
  ],
})
export class CoursesModule {}
