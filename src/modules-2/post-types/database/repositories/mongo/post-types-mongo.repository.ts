import { Model } from 'mongoose';

import { PostTypeMongoEntityMapper } from '../../models/mongo/post-types-mongo-model.mapper';
import { PostTypeMongoEntity } from '../../models/mongo/post-types-mongo.model';
import { IPostTypesRepository } from '../post-types-repository.interface';

import { MongoBaseSearchRepository } from '@/common/abstractions/repositories/mongo/mongo-base-search-repository.abstraction';
import { PostTypeEntity } from '@/modules/post-types/entities/post-types.entity';

export class PostTypesMongoRepository
  extends MongoBaseSearchRepository<PostTypeEntity, PostTypeMongoEntity>
  implements IPostTypesRepository
{
  constructor(protected postTypesModel: Model<PostTypeMongoEntity>) {
    super(new PostTypeMongoEntityMapper(), postTypesModel);
  }

  async findByName(name: string): Promise<PostTypeEntity | null> {
    const result = await this.postTypesModel.findOne({ name });
    if (!result) return null;
    return this.entityMapper.toDomainEntity(result);
  }
}
