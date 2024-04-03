import { SubjectMongoEntity } from './subjects-mongo.model';

import { SubjectEntity } from '@/modules/subjects/entities/subjects.entity';
import { SubjectEntityFactory } from '@/modules/subjects/entities/subjects.factory';

export class SubjectMongoEntityMapper {
  static toDomainEntity(entity: SubjectMongoEntity): SubjectEntity {
    return new SubjectEntityFactory().create({
      name: entity.name,
      created_at: entity.created_at,
      id: entity._id,
    });
  }

  static toMongoEntity(entity: SubjectEntity): SubjectMongoEntity {
    return {
      _id: entity.id,
      created_at: entity.created_at,
      name: entity.name,
    };
  }
}
