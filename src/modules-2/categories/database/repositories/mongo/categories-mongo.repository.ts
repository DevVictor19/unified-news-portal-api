import { Model } from 'mongoose';

import { CategoryMongoEntityMapper } from '../../models/mongo/caregories-mongo-model.mapper';
import { CategoryMongoEntity } from '../../models/mongo/categories-mongo.model';
import { ICategoriesRepository } from '../categories-repository.interface';

import { MongoBaseSearchRepository } from '@/common/abstractions/repositories/mongo/mongo-base-search-repository.abstraction';
import { CategoryEntity } from '@/modules/categories/entities/categories.entity';

export class CategoriesMongoRepository
  extends MongoBaseSearchRepository<CategoryEntity, CategoryMongoEntity>
  implements ICategoriesRepository
{
  constructor(protected categoriesModel: Model<CategoryMongoEntity>) {
    super(new CategoryMongoEntityMapper(), categoriesModel);
  }

  async findByName(name: string): Promise<CategoryEntity | null> {
    const mongoEntity = await this.categoriesModel.findOne({ name });
    if (!mongoEntity) return null;
    return this.entityMapper.toDomainEntity(mongoEntity);
  }
}
