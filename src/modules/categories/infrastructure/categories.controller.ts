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

import { CreateCategoriesDto } from './dtos';
import {
  CreateCategoriesUseCase,
  SearchCategoriesUseCase,
  DeleteCategoriesUseCase,
} from '../application/usecases';

import ProtectedRoute from '@/common/infrastructure/nest/decorators/protected-route.decorator';
import {
  LeaderRoute,
  StudentRoute,
  TeacherRoute,
} from '@/common/infrastructure/nest/decorators/roles.decorator';
import { UsePaginationQuery } from '@/common/infrastructure/nest/decorators/use-pagination-query';
import { PaginationDto } from '@/common/infrastructure/nest/dtos/pagination.dto';

@ApiTags('Categories')
@Controller('categories')
@ProtectedRoute()
export class CategoriesController {
  constructor(
    private createCategoriesUseCase: CreateCategoriesUseCase,
    private searchCategoriesUseCase: SearchCategoriesUseCase,
    private deleteCategoriesUseCase: DeleteCategoriesUseCase,
  ) {}

  @Post()
  @LeaderRoute()
  createCategories(@Body() dto: CreateCategoriesDto) {
    return this.createCategoriesUseCase.execute(dto);
  }

  @Get()
  @StudentRoute()
  @UsePaginationQuery()
  searchCategories(@Query() dto: PaginationDto) {
    return this.searchCategoriesUseCase.execute(dto);
  }

  @Delete(':categoryId')
  @TeacherRoute()
  deleteCategories(@Param('categoryId', ParseUUIDPipe) categoryId: string) {
    return this.deleteCategoriesUseCase.execute({ categoryId });
  }
}
