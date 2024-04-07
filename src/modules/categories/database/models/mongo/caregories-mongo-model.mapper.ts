import { CategoryMongoEntity } from './categories-mongo.model';

import { CategoryEntity } from '@/modules/categories/entities/categories.entity';
import { CategoryEntityFactory } from '@/modules/categories/entities/categories.factory';

export class CategoryMongoEntityMapper {
  static toMongoEntity(entity: CategoryEntity): CategoryMongoEntity {
    return {
      _id: entity.id,
      created_at: entity.created_at,
      name: entity.name,
    };
  }

  static toDomainEntity(entity: CategoryMongoEntity): CategoryEntity {
    return new CategoryEntityFactory().create({
      id: entity._id,
      created_at: entity.created_at,
      name: entity.name,
    });
  }
}
