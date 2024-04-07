import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CategoriesController } from './categories.controller';
import {
  CategoryMongoEntity,
  CategoryMongoSchema,
} from './database/models/mongo/categories-mongo.model';
import { CATEGORIES_REPOSITORY } from './database/repositories/categories-repository.constants';
import { ICategoriesRepository } from './database/repositories/categories-repository.interface';
import { CategoriesMongoRepository } from './database/repositories/mongo/categories-mongo.repository';
import { CategoryEntityFactory } from './entities/categories.factory';
import {
  CreateCategoriesUseCase,
  DeleteCategoriesUseCase,
  SearchCategoriesUseCase,
} from './usecases';

@Module({
  controllers: [CategoriesController],
  imports: [
    MongooseModule.forFeature([
      { name: CategoryMongoEntity.name, schema: CategoryMongoSchema },
    ]),
  ],
  providers: [
    {
      provide: CATEGORIES_REPOSITORY,
      useFactory: (categoryModel: Model<CategoryMongoEntity>) => {
        return new CategoriesMongoRepository(categoryModel);
      },
      inject: [getModelToken(CategoryMongoEntity.name)],
    },
    {
      provide: CategoryEntityFactory,
      useClass: CategoryEntityFactory,
    },
    {
      provide: CreateCategoriesUseCase,
      useFactory: (
        categoryEntityFactory: CategoryEntityFactory,
        categoriesRepository: ICategoriesRepository,
      ) => {
        return new CreateCategoriesUseCase(
          categoryEntityFactory,
          categoriesRepository,
        );
      },
      inject: [CategoryEntityFactory, CATEGORIES_REPOSITORY],
    },
    {
      provide: DeleteCategoriesUseCase,
      useFactory: (categoriesRepository: ICategoriesRepository) => {
        return new DeleteCategoriesUseCase(categoriesRepository);
      },
      inject: [CATEGORIES_REPOSITORY],
    },
    {
      provide: SearchCategoriesUseCase,
      useFactory: (categoriesRepository: ICategoriesRepository) => {
        return new SearchCategoriesUseCase(categoriesRepository);
      },
      inject: [CATEGORIES_REPOSITORY],
    },
  ],
})
export class CategoriesModule {}
