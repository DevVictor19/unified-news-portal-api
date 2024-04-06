import { Model } from 'mongoose';

import { ClassMongoEntityMapper } from '../../models/mongo/classes-mongo-model.mapper';
import { ClassMongoEntity } from '../../models/mongo/classes-mongo.model';
import { IClassesRepository } from '../classes-repository.interface';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { ClassEntity } from '@/modules/classes/entities/classes.entity';

export class ClassesMongoRepository implements IClassesRepository {
  constructor(private classModel: Model<ClassMongoEntity>) {}

  async insert(entity: ClassEntity): Promise<void> {
    const mongoEntity = ClassMongoEntityMapper.toMongoEntity(entity);
    const createdClass = new this.classModel(mongoEntity);
    await createdClass.save();
  }

  async search({
    limitPerPage,
    pageNumber,
    searchTerm,
  }: RepositorySearch): Promise<ClassEntity[]> {
    const skipAmount = (pageNumber - 1) * limitPerPage;

    if (searchTerm) {
      const results = await this.classModel
        .find(
          { $text: { $search: searchTerm } },
          { score: { $meta: 'textScore' } },
        )
        .sort({ score: { $meta: 'textScore' } })
        .skip(skipAmount)
        .limit(limitPerPage);

      return results.map((mongoEntity) =>
        ClassMongoEntityMapper.toDomainEntity(mongoEntity),
      );
    }

    const results = await this.classModel
      .find()
      .skip(skipAmount)
      .limit(limitPerPage);

    return results.map((mongoEntity) =>
      ClassMongoEntityMapper.toDomainEntity(mongoEntity),
    );
  }

  async findAll(): Promise<ClassEntity[]> {
    const results = await this.classModel.find();
    return results.map((mongoEntity) =>
      ClassMongoEntityMapper.toDomainEntity(mongoEntity),
    );
  }

  async findByName(name: string): Promise<ClassEntity | null> {
    const result = await this.classModel.findOne({ name });
    if (!result) return null;
    return ClassMongoEntityMapper.toDomainEntity(result);
  }

  async findById(id: string): Promise<ClassEntity | null> {
    const result = await this.classModel.findById(id);
    if (!result) return null;
    return ClassMongoEntityMapper.toDomainEntity(result);
  }

  async update(id: string, entity: ClassEntity): Promise<void> {
    await this.classModel.findByIdAndUpdate(id, entity);
  }

  async delete(id: string): Promise<void> {
    await this.classModel.deleteOne({ _id: id });
  }
}
