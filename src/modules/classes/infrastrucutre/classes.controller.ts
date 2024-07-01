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
import { ApiTags } from '@nestjs/swagger';

import { CreateClassesDto } from './dtos';
import {
  CreateClassesUseCase,
  SearchClassesUseCase,
  DeleteClassesUseCase,
} from '../application/usecases';

import ProtectedRoute from '@/common/infrastructure/nest/decorators/protected-route.decorator';
import {
  LeaderRoute,
  StudentRoute,
  TeacherRoute,
} from '@/common/infrastructure/nest/decorators/roles.decorator';
import { UsePaginationQuery } from '@/common/infrastructure/nest/decorators/use-pagination-query';
import { PaginationDto } from '@/common/infrastructure/nest/dtos/pagination.dto';

@ApiTags('Classes')
@Controller('/classes')
@ProtectedRoute()
export class ClassesController {
  constructor(
    private createClassesUseCase: CreateClassesUseCase,
    private searchClassesUseCase: SearchClassesUseCase,
    private deleteClassesUseCase: DeleteClassesUseCase,
  ) {}

  @Post('/')
  @LeaderRoute()
  createClasses(@Body() dto: CreateClassesDto) {
    return this.createClassesUseCase.execute(dto);
  }

  @Get('/')
  @StudentRoute()
  @UsePaginationQuery()
  searchClasses(@Query() dto: PaginationDto) {
    return this.searchClassesUseCase.execute(dto);
  }

  @Delete('/:classId')
  @TeacherRoute()
  deleteClasses(@Param('classId', ParseUUIDPipe) classId: string) {
    return this.deleteClassesUseCase.execute({ classId });
  }
}
