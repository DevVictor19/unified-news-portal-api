import { Model } from 'mongoose';

import { CourseMongoEntityMapper } from '../../models/mongo/courses-mongo-model.mapper';
import { CourseMongoEntity } from '../../models/mongo/courses-mongo.model';
import { ICoursesRepository } from '../courses-repository.interface';

import { MongoBaseSearchRepository } from '@/common/abstractions/repositories/mongo/mongo-base-search-repository.abstraction';
import { CourseEntity } from '@/modules/courses/entities/courses.entity';

export class CoursesMongoRepository
  extends MongoBaseSearchRepository<CourseEntity, CourseMongoEntity>
  implements ICoursesRepository
{
  constructor(private coursesModel: Model<CourseMongoEntity>) {
    super(new CourseMongoEntityMapper(), coursesModel);
  }

  async findByName(name: string): Promise<CourseEntity | null> {
    const result = await this.coursesModel.findOne({ name });
    if (!result) return null;
    return this.entityMapper.toDomainEntity(result);
  }
}
