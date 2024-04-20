import { SubjectMongoEntity, SubjectMongoModel } from './subjects-mongo.model';

import { IBaseEntityMapper } from '@/common/abstractions/mappers/base-entity-mapper.abstraction';
import { SubjectEntity } from '@/modules/subjects/entities/subjects.entity';

export class SubjectMongoEntityMapper
  implements IBaseEntityMapper<SubjectEntity, SubjectMongoEntity>
{
  toDomainEntity(entity: SubjectMongoEntity): SubjectEntity {
    return new SubjectEntity({
      name: entity.name,
      created_at: entity.created_at,
      id: entity._id,
    });
  }

  toDatabaseEntity(entity: SubjectEntity): SubjectMongoEntity {
    return new SubjectMongoModel({
      _id: entity.id,
      created_at: entity.created_at,
      name: entity.name,
    });
  }
}
