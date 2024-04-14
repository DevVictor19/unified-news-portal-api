import {
  PostTypeMongoEntity,
  PostTypeMongoModel,
} from './post-types-mongo.model';

import { IBaseEntityMapper } from '@/common/abstractions/mappers/base-entity-mapper.abstraction';
import { PostTypeEntity } from '@/modules/post-types/entities/post-types.entity';

export class PostTypeMongoEntityMapper
  implements IBaseEntityMapper<PostTypeEntity, PostTypeMongoEntity>
{
  toDomainEntity(entity: PostTypeMongoEntity): PostTypeEntity {
    return new PostTypeEntity({
      name: entity.name,
      created_at: entity.created_at,
      id: entity._id,
    });
  }

  toDatabaseEntity(entity: PostTypeEntity): PostTypeMongoEntity {
    return new PostTypeMongoModel({
      _id: entity.id,
      created_at: entity.created_at,
      name: entity.name,
    });
  }
}
