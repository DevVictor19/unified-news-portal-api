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

import { CreateCoursesDto } from './dtos';
import {
  CreateCoursesUseCase,
  SearchCoursesUseCase,
  DeleteCoursesUseCase,
} from '../application/usecases';

import {
  LeaderRoute,
  StudentRoute,
  TeacherRoute,
} from '@/common/infrastructure/nest/decorators/roles.decorator';
import { UsePaginationQuery } from '@/common/infrastructure/nest/decorators/use-pagination-query';
import { PaginationDto } from '@/common/infrastructure/nest/dtos/pagination.dto';

@Controller('/courses')
export class CoursesController {
  constructor(
    private createCoursesUseCase: CreateCoursesUseCase,
    private searchCoursesUseCase: SearchCoursesUseCase,
    private deleteCoursesUseCase: DeleteCoursesUseCase,
  ) {}

  @Post('/')
  @LeaderRoute()
  createCourses(@Body() dto: CreateCoursesDto) {
    return this.createCoursesUseCase.execute(dto);
  }

  @Get('/')
  @StudentRoute()
  @UsePaginationQuery()
  searchCourses(@Query() dto: PaginationDto) {
    return this.searchCoursesUseCase.execute(dto);
  }

  @Delete('/:courseId')
  @TeacherRoute()
  deleteCourses(@Param('courseId', ParseUUIDPipe) courseId: string) {
    return this.deleteCoursesUseCase.execute({ courseId });
  }
}
