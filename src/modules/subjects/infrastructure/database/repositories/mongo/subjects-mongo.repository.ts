import { Model } from 'mongoose';

import { SubjectMongoEntityMapper } from '../../models/mongo/subjects-mongo-model.mapper';
import { SubjectMongoEntity } from '../../models/mongo/subjects-mongo.model';

import { MongoBaseSearchRepository } from '@/common/infrastructure/repositories/mongo/mongo-base-search-repository';
import { SubjectEntity } from '@/modules/subjects/domain/entities/subjects.entity';
import { ISubjectsRepository } from '@/modules/subjects/domain/repositories/subjects-repository.interface';

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
