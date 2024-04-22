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
import { SubjectsPresenter } from './presenters/subjects.presenter';
import {
  CreateSubjectsUseCase,
  SearchSubjectsUseCase,
  DeleteSubjectsUseCase,
} from '../application/usecases';
import { SubjectEntity } from '../domain/entities/subjects.entity';

import ProtectedRoute from '@/common/infrastructure/nest/decorators/protected-route.decorator';
import {
  LeaderRoute,
  StudentRoute,
  TeacherRoute,
} from '@/common/infrastructure/nest/decorators/roles.decorator';
import { SearchQueryDto } from '@/common/infrastructure/nest/dtos/search-query.dto';

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
  async searchSubjects(@Query() dto: SearchQueryDto) {
    const results = await this.searchSubjectsUseCase.execute(dto);
    return this.formatCollection(results);
  }

  @Delete('/:subjectId')
  @TeacherRoute()
  deleteSubjects(@Param('subjectId', ParseUUIDPipe) subjectId: string) {
    return this.deleteSubjectsUseCase.execute({ subjectId });
  }

  private formatCollection(input: SubjectEntity[]) {
    return input.map((data) => SubjectsPresenter.format(data));
  }
}
