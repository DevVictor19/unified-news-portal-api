import {
  CategoryMongoEntity,
  CategoryMongoModel,
} from './categories-mongo.model';

import { IBaseEntityMapper } from '@/common/abstractions/mappers/base-entity-mapper.abstraction';
import { CategoryEntity } from '@/modules/categories/entities/categories.entity';

export class CategoryMongoEntityMapper
  implements IBaseEntityMapper<CategoryEntity, CategoryMongoEntity>
{
  toDomainEntity(entity: CategoryMongoEntity): CategoryEntity {
    return new CategoryEntity({
      name: entity.name,
      created_at: entity.created_at,
      id: entity._id,
    });
  }

  toDatabaseEntity(entity: CategoryEntity): CategoryMongoEntity {
    return new CategoryMongoModel({
      _id: entity.id,
      created_at: entity.created_at,
      name: entity.name,
    });
  }
}
