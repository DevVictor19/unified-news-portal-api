import { CourseMongoEntity, CourseMongoModel } from './courses-mongo.model';

import { IBaseEntityMapper } from '@/common/application/mappers/base-entity-mapper.interface';
import { CourseEntity } from '@/modules/courses/domain/entities/courses.entity';

export class CourseMongoEntityMapper
  implements IBaseEntityMapper<CourseEntity, CourseMongoEntity>
{
  toDomainEntity(entity: CourseMongoEntity): CourseEntity {
    return new CourseEntity({
      name: entity.name,
      created_at: entity.created_at,
      id: entity._id,
    });
  }

  toDatabaseEntity(entity: CourseEntity): CourseMongoEntity {
    return new CourseMongoModel({
      _id: entity.id,
      created_at: entity.created_at,
      name: entity.name,
    });
  }
}
