import { Model } from 'mongoose';

import { PostTypeMongoEntityMapper } from '../../models/mongo/post-types-mongo-model.mapper';
import { PostTypeMongoEntity } from '../../models/mongo/post-types-mongo.model';

import { MongoBaseSearchRepository } from '@/common/infrastructure/repositories/mongo/mongo-base-search-repository';
import { PostTypeEntity } from '@/modules/post-types/domain/entities/post-types.entity';
import { IPostTypesRepository } from '@/modules/post-types/domain/repositories/post-types-repository.interface';

export class PostTypesMongoRepository
  extends MongoBaseSearchRepository<PostTypeEntity, PostTypeMongoEntity>
  implements IPostTypesRepository
{
  constructor(postTypesModel: Model<PostTypeMongoEntity>) {
    super(new PostTypeMongoEntityMapper(), postTypesModel, {
      _id: 'string',
      name: 'string',
      created_at: 'date',
    });
  }

  async findByName(name: string): Promise<PostTypeEntity | null> {
    const result = await this.entityModel.findOne({ name });
    if (!result) return null;
    return this.entityMapper.toDomainEntity(result);
  }
}
