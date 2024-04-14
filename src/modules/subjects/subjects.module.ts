import { Module } from '@nestjs/common';

import { SubjectsController } from './subjects.controller';
import { CreateSubjectsUseCase, SearchSubjectsUseCase } from './usecases';
import { DeleteSubjectsUseCase } from './usecases/delete-subjects.usecase';

@Module({
  controllers: [SubjectsController],
  providers: [
    CreateSubjectsUseCase,
    DeleteSubjectsUseCase,
    SearchSubjectsUseCase,
  ],
})
export class SubjectsModule {}
