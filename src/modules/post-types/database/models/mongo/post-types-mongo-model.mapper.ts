import { PostTypeMongoEntity } from './post-types-mongo.model';

import { PostTypeEntity } from '@/modules/post-types/entities/post-types.entity';
import { PostTypeEntityFactory } from '@/modules/post-types/entities/post-types.factory';

export class PostTypeMongoEntityMapper {
  static toMongoEntity(entity: PostTypeEntity): PostTypeMongoEntity {
    return {
      _id: entity.id,
      created_at: entity.created_at,
      name: entity.name,
    };
  }

  static toDomainEntity(entity: PostTypeMongoEntity): PostTypeEntity {
    return new PostTypeEntityFactory().create({
      name: entity.name,
      created_at: entity.created_at,
      id: entity._id,
    });
  }
}
