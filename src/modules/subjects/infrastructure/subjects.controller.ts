import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';

import { CreateSubjectsDto } from './dtos';
import {
  CreateSubjectsUseCase,
  SearchSubjectsUseCase,
  DeleteSubjectsUseCase,
} from '../application/usecases';

import ProtectedRoute from '@/common/infrastructure/nest/decorators/protected-route.decorator';
import {
  LeaderRoute,
  StudentRoute,
  TeacherRoute,
} from '@/common/infrastructure/nest/decorators/roles.decorator';
import { UsePaginationQuery } from '@/common/infrastructure/nest/decorators/use-pagination-query';
import { PaginationDto } from '@/common/infrastructure/nest/dtos/pagination.dto';

@Controller('/subjects')
@ProtectedRoute()
export class SubjectsController {
  constructor(
    private createSubjectsUseCase: CreateSubjectsUseCase,
    private searchSubjectsUseCase: SearchSubjectsUseCase,
    private deleteSubjectsUseCase: DeleteSubjectsUseCase,
  ) {}

  @Post('/')
  @LeaderRoute()
  createSubjects(@Body() dto: CreateSubjectsDto) {
    return this.createSubjectsUseCase.execute(dto);
  }

  @Get('/')
  @StudentRoute()
  @UsePaginationQuery()
  searchSubjects(@Query() dto: PaginationDto) {
    return this.searchSubjectsUseCase.execute(dto);
  }

  @Delete('/:subjectId')
  @TeacherRoute()
  deleteSubjects(@Param('subjectId', ParseUUIDPipe) subjectId: string) {
    return this.deleteSubjectsUseCase.execute({ subjectId });
  }
}
