import { Body, Controller, Post } from '@nestjs/common';

import { CreateSubjectsDto } from './dtos';
import { CreateSubjectsUseCase } from './usecases/create-subjects.usecase';

import ProtectedRoute from '@/common/decorators/protected-route.decorator';
import { LeaderRoute } from '@/common/decorators/roles.decorator';

@Controller('/subjects')
@ProtectedRoute()
export class SubjectsController {
  constructor(private createSubjectsUseCase: CreateSubjectsUseCase) {}

  @Post('/')
  @LeaderRoute()
  createSubjects(@Body() dto: CreateSubjectsDto) {
    return this.createSubjectsUseCase.execute(dto);
  }
}
