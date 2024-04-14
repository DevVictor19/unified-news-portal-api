import { Model } from 'mongoose';

import { SubjectMongoEntityMapper } from '../../models/mongo/subjects-mongo-model.mapper';
import { SubjectMongoEntity } from '../../models/mongo/subjects-mongo.model';
import { ISubjectsRepository } from '../subjects-repository.interface';

import { MongoBaseSearchRepository } from '@/common/abstractions/repositories/mongo/mongo-base-search-repository.abstraction';
import { SubjectEntity } from '@/modules/subjects/entities/subjects.entity';

export class SubjectsMongoRepository
  extends MongoBaseSearchRepository<SubjectEntity, SubjectMongoEntity>
  implements ISubjectsRepository
{
  constructor(protected subjectsModel: Model<SubjectMongoEntity>) {
    super(new SubjectMongoEntityMapper(), subjectsModel);
  }

  async findByName(name: string): Promise<SubjectEntity | null> {
    const result = await this.subjectsModel.findOne({ name });
    if (!result) return null;
    return this.entityMapper.toDomainEntity(result);
  }
}
