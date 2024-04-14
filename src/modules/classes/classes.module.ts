import { Module } from '@nestjs/common';

import { ClassesController } from './classes.controller';
import {
  CreateClassesUseCase,
  DeleteClassesUseCase,
  SearchClassesUseCase,
} from './usecases';

@Module({
  controllers: [ClassesController],
  providers: [CreateClassesUseCase, DeleteClassesUseCase, SearchClassesUseCase],
})
export class ClassesModule {}
