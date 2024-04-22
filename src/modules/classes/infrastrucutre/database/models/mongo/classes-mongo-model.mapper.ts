import { ClassMongoEntity, ClassMongoModel } from './classes-mongo.model';

import { IBaseEntityMapper } from '@/common/application/mappers/base-entity-mapper.interface';
import { ClassEntity } from '@/modules/classes/domain/entities/classes.entity';

export class ClassMongoEntityMapper
  implements IBaseEntityMapper<ClassEntity, ClassMongoEntity>
{
  toDomainEntity(entity: ClassMongoEntity): ClassEntity {
    return new ClassEntity({
      name: entity.name,
      created_at: entity.created_at,
      id: entity._id,
    });
  }

  toDatabaseEntity(entity: ClassEntity): ClassMongoEntity {
    return new ClassMongoModel({
      _id: entity.id,
      created_at: entity.created_at,
      name: entity.name,
    });
  }
}
