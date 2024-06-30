import { PostsMongoEntity, PostsMongoModel } from './posts-mongo.model';

import { IBaseEntityMapper } from '@/common/application/mappers/base-entity-mapper.interface';
import { PostsEntity } from '@/modules/posts/domain/entities/posts.entity';

export class PostsMongoEntityMapper
  implements IBaseEntityMapper<PostsEntity, PostsMongoEntity>
{
  toDatabaseEntity(entity: PostsEntity): PostsMongoEntity {
    return new PostsMongoModel({
      _id: entity.id,
      user_id: entity.user_id,
      author: entity.author,
      title: entity.title,
      text: entity.text,
      media_url: entity.media_url,
      categories: entity.categories,
      courses: entity.courses,
      classes: entity.classes,
      subjects: entity.subjects,
      post_types: entity.post_types,
      created_at: entity.created_at,
    });
  }

  toDomainEntity(entity: PostsMongoEntity): PostsEntity {
    return new PostsEntity({
      id: entity._id,
      user_id: entity.user_id,
      author: entity.author,
      title: entity.title,
      text: entity.text,
      media_url: entity.media_url,
      categories: entity.categories,
      courses: entity.courses,
      classes: entity.classes,
      subjects: entity.subjects,
      post_types: entity.post_types,
      created_at: entity.created_at,
    });
  }
}
