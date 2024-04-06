import { ClassMongoEntity } from './classes-mongo.model';

import { ClassEntity } from '@/modules/classes/entities/classes.entity';
import { ClassEntityFactory } from '@/modules/classes/entities/classes.factory';

export class ClassMongoEntityMapper {
  static toDomainEntity(entity: ClassMongoEntity): ClassEntity {
    return new ClassEntityFactory().create({
      name: entity.name,
      created_at: entity.created_at,
      id: entity._id,
    });
  }

  static toMongoEntity(entity: ClassEntity): ClassMongoEntity {
    return {
      _id: entity.id,
      created_at: entity.created_at,
      name: entity.name,
    };
  }
}
