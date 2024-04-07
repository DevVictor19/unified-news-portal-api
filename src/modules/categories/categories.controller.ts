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

import { CreateCategoriesDto } from './dtos';
import { CategoryEntity } from './entities/categories.entity';
import { CategoriesPresenter } from './presenters/categories.presenter';
import {
  CreateCategoriesUseCase,
  DeleteCategoriesUseCase,
  SearchCategoriesUseCase,
} from './usecases';

import ProtectedRoute from '@/common/decorators/protected-route.decorator';
import {
  LeaderRoute,
  StudentRoute,
  TeacherRoute,
} from '@/common/decorators/roles.decorator';
import { SearchQueryDto } from '@/common/dtos/search-query.dto';

@Controller('/categories')
@ProtectedRoute()
export class CategoriesController {
  constructor(
    private createCategoriesUseCase: CreateCategoriesUseCase,
    private searchCategoriesUseCase: SearchCategoriesUseCase,
    private deleteCategoriesUseCase: DeleteCategoriesUseCase,
  ) {}

  @Post('/')
  @LeaderRoute()
  createCategories(@Body() dto: CreateCategoriesDto) {
    return this.createCategoriesUseCase.execute(dto);
  }

  @Get('/')
  @StudentRoute()
  async searchCategories(@Query() dto: SearchQueryDto) {
    const results = await this.searchCategoriesUseCase.execute(dto);
    return this.formatCollection(results);
  }

  @Delete('/:categoryId')
  @TeacherRoute()
  deleteCategories(@Param('categoryId', ParseUUIDPipe) categoryId: string) {
    return this.deleteCategoriesUseCase.execute({ categoryId });
  }

  private formatCollection(input: CategoryEntity[]) {
    return input.map((data) => CategoriesPresenter.format(data));
  }
}
