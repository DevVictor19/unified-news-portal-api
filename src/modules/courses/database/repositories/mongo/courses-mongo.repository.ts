import { Model } from 'mongoose';

import { CourseMongoEntityMapper } from '../../models/mongo/courses-mongo-model.mapper';
import { CourseMongoEntity } from '../../models/mongo/courses-mongo.model';
import { ICoursesRepository } from '../courses-repository.interface';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { CourseEntity } from '@/modules/courses/entities/courses.entity';

export class CoursesMongoRepository implements ICoursesRepository {
  constructor(private courseModel: Model<CourseMongoEntity>) {}

  async insert(entity: CourseEntity): Promise<void> {
    const mongoEntity = CourseMongoEntityMapper.toMongoEntity(entity);
    const createdCourse = new this.courseModel(mongoEntity);
    await createdCourse.save();
  }

  async search({
    limitPerPage,
    pageNumber,
    searchTerm,
  }: RepositorySearch): Promise<CourseEntity[]> {
    const skipAmount = (pageNumber - 1) * limitPerPage;

    if (searchTerm) {
      const results = await this.courseModel
        .find(
          { $text: { $search: searchTerm } },
          { score: { $meta: 'textScore' } },
        )
        .sort({ score: { $meta: 'textScore' } })
        .skip(skipAmount)
        .limit(limitPerPage);

      return results.map((mongoEntity) =>
        CourseMongoEntityMapper.toDomainEntity(mongoEntity),
      );
    }

    const results = await this.courseModel
      .find()
      .skip(skipAmount)
      .limit(limitPerPage);

    return results.map((mongoEntity) =>
      CourseMongoEntityMapper.toDomainEntity(mongoEntity),
    );
  }

  async findAll(): Promise<CourseEntity[]> {
    const results = await this.courseModel.find();
    return results.map((mongoEntity) =>
      CourseMongoEntityMapper.toDomainEntity(mongoEntity),
    );
  }

  async findByName(name: string): Promise<CourseEntity | null> {
    const result = await this.courseModel.findOne({ name });
    if (!result) return null;
    return CourseMongoEntityMapper.toDomainEntity(result);
  }

  async findById(id: string): Promise<CourseEntity | null> {
    const result = await this.courseModel.findById(id);
    if (!result) return null;
    return CourseMongoEntityMapper.toDomainEntity(result);
  }

  async update(id: string, entity: CourseEntity): Promise<void> {
    await this.courseModel.findByIdAndUpdate(id, entity);
  }

  async delete(id: string): Promise<void> {
    await this.courseModel.deleteOne({ _id: id });
  }
}
