import { Model } from 'mongoose';

import { SubjectMongoEntityMapper } from '../../models/mongo/subjects-mongo-model.mapper';
import { SubjectMongoEntity } from '../../models/mongo/subjects-mongo.model';
import { ISubjectsRepository } from '../subjects-repository.interface';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';
import { SubjectEntity } from '@/modules/subjects/entities/subjects.entity';

export class SubjectsMongoRepository implements ISubjectsRepository {
  constructor(private subjectModel: Model<SubjectMongoEntity>) {}

  async insert(entity: SubjectEntity): Promise<void> {
    const mongoEntity = SubjectMongoEntityMapper.toMongoEntity(entity);
    const createdSubject = new this.subjectModel(mongoEntity);
    await createdSubject.save();
  }

  async search({
    limitPerPage,
    pageNumber,
    searchTerm,
  }: RepositorySearch): Promise<SubjectEntity[]> {
    const skipAmount = (pageNumber - 1) * limitPerPage;

    if (searchTerm) {
      const results = await this.subjectModel
        .find(
          { $text: { $search: searchTerm } },
          { score: { $meta: 'textScore' } },
        )
        .sort({ score: { $meta: 'textScore' } })
        .skip(skipAmount)
        .limit(limitPerPage);

      return results.map((mongoEntity) =>
        SubjectMongoEntityMapper.toDomainEntity(mongoEntity),
      );
    }

    const results = await this.subjectModel
      .find()
      .skip(skipAmount)
      .limit(limitPerPage);

    return results.map((mongoEntity) =>
      SubjectMongoEntityMapper.toDomainEntity(mongoEntity),
    );
  }

  async findAll(): Promise<SubjectEntity[]> {
    const results = await this.subjectModel.find();
    return results.map((mongoEntity) =>
      SubjectMongoEntityMapper.toDomainEntity(mongoEntity),
    );
  }

  async findByName(name: string): Promise<SubjectEntity | null> {
    const result = await this.subjectModel.findOne({ name });
    if (!result) return null;
    return SubjectMongoEntityMapper.toDomainEntity(result);
  }

  async findById(id: string): Promise<SubjectEntity | null> {
    const result = await this.subjectModel.findById(id);
    if (!result) return null;
    return SubjectMongoEntityMapper.toDomainEntity(result);
  }

  async update(id: string, entity: SubjectEntity): Promise<void> {
    await this.subjectModel.findByIdAndUpdate(id, entity);
  }

  async delete(id: string): Promise<void> {
    await this.subjectModel.deleteOne({ _id: id });
  }
}
