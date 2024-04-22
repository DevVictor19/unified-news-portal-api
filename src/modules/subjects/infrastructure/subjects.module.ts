import { Module } from '@nestjs/common';

import { SubjectsController } from './subjects.controller';
import {
  CreateSubjectsUseCase,
  DeleteSubjectsUseCase,
  SearchSubjectsUseCase,
} from '../application/usecases';

@Module({
  controllers: [SubjectsController],
  providers: [
    CreateSubjectsUseCase,
    DeleteSubjectsUseCase,
    SearchSubjectsUseCase,
  ],
})
export class SubjectsModule {}
