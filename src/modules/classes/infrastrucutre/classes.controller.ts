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

import { CreateClassesDto } from './dtos';
import { ClassesPresenter } from './presenters/classes.presenter';
import {
  CreateClassesUseCase,
  SearchClassesUseCase,
  DeleteClassesUseCase,
} from '../application/usecases';
import { ClassEntity } from '../domain/entities/classes.entity';

import ProtectedRoute from '@/common/infrastructure/nest/decorators/protected-route.decorator';
import {
  LeaderRoute,
  StudentRoute,
  TeacherRoute,
} from '@/common/infrastructure/nest/decorators/roles.decorator';
import { SearchQueryDto } from '@/common/infrastructure/nest/dtos/search-query.dto';

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
  async searchClasses(@Query() dto: SearchQueryDto) {
    const results = await this.searchClassesUseCase.execute(dto);
    return this.formatCollection(results);
  }

  @Delete('/:classId')
  @TeacherRoute()
  deleteClasses(@Param('classId', ParseUUIDPipe) classId: string) {
    return this.deleteClassesUseCase.execute({ classId });
  }

  private formatCollection(input: ClassEntity[]) {
    return input.map((data) => ClassesPresenter.format(data));
  }
}
