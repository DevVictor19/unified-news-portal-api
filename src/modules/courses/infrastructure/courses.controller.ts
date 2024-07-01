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

import { CreateCoursesDto } from './dtos';
import {
  CreateCoursesUseCase,
  SearchCoursesUseCase,
  DeleteCoursesUseCase,
} from '../application/usecases';

import ProtectedRoute from '@/common/infrastructure/nest/decorators/protected-route.decorator';
import {
  LeaderRoute,
  StudentRoute,
  TeacherRoute,
} from '@/common/infrastructure/nest/decorators/roles.decorator';
import { UsePaginationQuery } from '@/common/infrastructure/nest/decorators/use-pagination-query';
import { PaginationDto } from '@/common/infrastructure/nest/dtos/pagination.dto';

@ApiTags('Courses')
@Controller('/courses')
@ProtectedRoute()
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
