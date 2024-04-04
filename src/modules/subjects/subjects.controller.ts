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
import { SubjectEntity } from './entities/subjects.entity';
import { SubjectsPresenter } from './presenters/subjects.presenter';
import { SearchSubjectsUseCase, CreateSubjectsUseCase } from './usecases';
import { DeleteSubjectsUseCase } from './usecases/delete-subjects.usecase';

import ProtectedRoute from '@/common/decorators/protected-route.decorator';
import {
  LeaderRoute,
  StudentRoute,
  TeacherRoute,
} from '@/common/decorators/roles.decorator';
import { SearchQueryDto } from '@/common/dtos/search-query.dto';

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
