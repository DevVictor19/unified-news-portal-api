import { CourseMongoEntity } from './courses-mongo.model';

import { CourseEntity } from '@/modules/courses/entities/courses.entity';
import { CourseEntityFactory } from '@/modules/courses/entities/courses.factory';

export class CourseMongoEntityMapper {
  static toMongoEntity(entity: CourseEntity): CourseMongoEntity {
    return {
      _id: entity.id,
      created_at: entity.created_at,
      name: entity.name,
    };
  }

  static toDomainEntity(entity: CourseMongoEntity): CourseEntity {
    return new CourseEntityFactory().create({
      id: entity._id,
      name: entity.name,
      created_at: entity.created_at,
    });
  }
}
