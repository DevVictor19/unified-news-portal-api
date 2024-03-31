import { Model } from 'mongoose';

import { Subject } from '../../entities/subjects.entity';
import { ISubjectsRepository } from '../subjects-repository.interface';

import { RepositorySearch } from '@/common/abstractions/repositories/base-search-repository.abstraction';

export class SubjectsMongoRepository implements ISubjectsRepository {
  constructor(private subjectModel: Model<Subject>) {}

  async insert(entity: Subject): Promise<void> {
    const createdSubject = new this.subjectModel(entity);
    await createdSubject.save();
  }

  search({
    limitPerPage,
    pageNumber,
    searchTerm,
  }: RepositorySearch): Promise<Subject[]> {
    const skipAmount = (pageNumber - 1) * limitPerPage;

    if (searchTerm) {
      return this.subjectModel
        .find(
          { $text: { $search: searchTerm } },
          { score: { $meta: 'textScore' } },
        )
        .sort({ score: { $meta: 'textScore' } })
        .skip(skipAmount)
        .limit(limitPerPage);
    }

    return this.subjectModel.find().skip(skipAmount).limit(limitPerPage);
  }

  findAll(): Promise<Subject[]> {
    return this.subjectModel.find();
  }

  findByName(name: string): Promise<Subject | null> {
    return this.subjectModel.findOne({ name });
  }

  findById(id: string): Promise<Subject | null> {
    return this.subjectModel.findById(id);
  }

  async update(id: string, entity: Subject): Promise<void> {
    await this.subjectModel.findByIdAndUpdate(id, entity);
  }

  async delete(id: string): Promise<void> {
    await this.subjectModel.deleteOne({ _id: id });
  }
}
