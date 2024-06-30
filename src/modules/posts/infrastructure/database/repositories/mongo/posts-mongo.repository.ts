import { Model } from 'mongoose';

import { PostsMongoEntityMapper } from '../../models/mongo/posts-mongo-model.mapper';
import { PostsMongoEntity } from '../../models/mongo/posts-mongo.model';

import { MongoBaseSearchRepository } from '@/common/infrastructure/repositories/mongo/mongo-base-search-repository';
import { PostsEntity } from '@/modules/posts/domain/entities/posts.entity';
import { IPostsRepository } from '@/modules/posts/domain/repositories/posts-repository.interface';

export class PostsMongoRepository
  extends MongoBaseSearchRepository<PostsEntity, PostsMongoEntity>
  implements IPostsRepository
{
  constructor(model: Model<PostsMongoEntity>) {
    super(new PostsMongoEntityMapper(), model, {
      author: 'string',
      title: 'string',
      text: 'string',
      categories: 'array',
      courses: 'array',
      classes: 'array',
      subjects: 'array',
      post_types: 'array',
    });
  }
}
