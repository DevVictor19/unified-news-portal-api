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
import { ClassEntity } from './entities/classes.entity';
import { ClassesPresenter } from './presenters/classes.presenter';
import {
  CreateClassesUseCase,
  DeleteClassesUseCase,
  SearchClassesUseCase,
} from './usecases';

import ProtectedRoute from '@/common/decorators/protected-route.decorator';
import {
  LeaderRoute,
  StudentRoute,
  TeacherRoute,
} from '@/common/decorators/roles.decorator';
import { SearchQueryDto } from '@/common/dtos/search-query.dto';

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
