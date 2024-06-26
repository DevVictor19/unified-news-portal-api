import { Model } from 'mongoose';

import { CourseMongoEntityMapper } from '../../models/mongo/courses-mongo-model.mapper';
import { CourseMongoEntity } from '../../models/mongo/courses-mongo.model';

import { MongoBaseSearchRepository } from '@/common/infrastructure/repositories/mongo/mongo-base-search-repository';
import { CourseEntity } from '@/modules/courses/domain/entities/courses.entity';
import { ICoursesRepository } from '@/modules/courses/domain/repositories/courses-repository.interface';

export class CoursesMongoRepository
  extends MongoBaseSearchRepository<CourseEntity, CourseMongoEntity>
  implements ICoursesRepository
{
  constructor(coursesModel: Model<CourseMongoEntity>) {
    super(new CourseMongoEntityMapper(), coursesModel, {
      _id: 'string',
      name: 'string',
      created_at: 'date',
    });
  }

  async findByName(name: string): Promise<CourseEntity | null> {
    const result = await this.entityModel.findOne({ name });
    if (!result) return null;
    return this.entityMapper.toDomainEntity(result);
  }
}
