import {
  PostTypeMongoEntity,
  PostTypeMongoModel,
} from './post-types-mongo.model';

import { IBaseEntityMapper } from '@/common/application/mappers/base-entity-mapper.interface';
import { PostTypeEntity } from '@/modules/post-types/domain/entities/post-types.entity';

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
