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
import { CoursesPresenter } from './presenters/courses.presenter';
import {
  CreateCoursesUseCase,
  SearchCoursesUseCase,
  DeleteCoursesUseCase,
} from '../application/usecases';
import { CourseEntity } from '../domain/entities/courses.entity';

import {
  LeaderRoute,
  StudentRoute,
  TeacherRoute,
} from '@/common/infrastructure/nest/decorators/roles.decorator';
import { SearchQueryDto } from '@/common/infrastructure/nest/dtos/search-query.dto';

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
  async searchCourses(@Query() dto: SearchQueryDto) {
    const results = await this.searchCoursesUseCase.execute(dto);
    return this.formatCollection(results);
  }

  @Delete('/:courseId')
  @TeacherRoute()
  deleteCourses(@Param('courseId', ParseUUIDPipe) courseId: string) {
    return this.deleteCoursesUseCase.execute({ courseId });
  }

  private formatCollection(input: CourseEntity[]) {
    return input.map((data) => CoursesPresenter.format(data));
  }
}
