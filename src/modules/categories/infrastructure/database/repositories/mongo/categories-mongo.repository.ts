import { Model } from 'mongoose';

import { CategoryMongoEntityMapper } from '../../models/mongo/categories-mongo-model.mapper';
import { CategoryMongoEntity } from '../../models/mongo/categories-mongo.model';

import { MongoBaseSearchRepository } from '@/common/infrastructure/repositories/mongo/mongo-base-search-repository';
import { CategoryEntity } from '@/modules/categories/domain/entities/categories.entity';
import { ICategoriesRepository } from '@/modules/categories/domain/repositories/categories-repository.interface';

export class CategoriesMongoRepository
  extends MongoBaseSearchRepository<CategoryEntity, CategoryMongoEntity>
  implements ICategoriesRepository
{
  constructor(categoriesModel: Model<CategoryMongoEntity>) {
    super(new CategoryMongoEntityMapper(), categoriesModel);
  }

  async findByName(name: string): Promise<CategoryEntity | null> {
    const mongoEntity = await this.entityModel.findOne({ name });
    if (!mongoEntity) return null;
    return this.entityMapper.toDomainEntity(mongoEntity);
  }
}
