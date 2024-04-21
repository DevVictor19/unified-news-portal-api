import { Module } from '@nestjs/common';

import { CategoriesController } from './categories.controller';
import {
  CreateCategoriesUseCase,
  DeleteCategoriesUseCase,
  SearchCategoriesUseCase,
} from '../application/usecases';

@Module({
  controllers: [CategoriesController],
  providers: [
    CreateCategoriesUseCase,
    DeleteCategoriesUseCase,
    SearchCategoriesUseCase,
  ],
})
export class CategoriesModule {}
