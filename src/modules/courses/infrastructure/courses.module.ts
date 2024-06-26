import { Module } from '@nestjs/common';

import { CoursesController } from './courses.controller';
import {
  CreateCoursesUseCase,
  DeleteCoursesUseCase,
  SearchCoursesUseCase,
} from '../application/usecases';

@Module({
  controllers: [CoursesController],
  providers: [CreateCoursesUseCase, DeleteCoursesUseCase, SearchCoursesUseCase],
})
export class CoursesModule {}
