import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  PostTypeMongoEntity,
  PostTypeMongoSchema,
} from './database/models/mongo/post-types-mongo.model';
import { PostTypesMongoRepository } from './database/repositories/mongo/post-types-mongo.repository';
import { POST_TYPES_REPOSITORY } from './database/repositories/post-types-repository.constants';
import { IPostTypesRepository } from './database/repositories/post-types-repository.interface';
import { PostTypeEntityFactory } from './entities/post-types.factory';
import { PostTypesController } from './post-types.controller';
import {
  CreatePostTypesUseCase,
  DeletePostTypesUseCase,
  SearchPostTypesUseCase,
} from './usecases';

@Module({
  controllers: [PostTypesController],
  imports: [
    MongooseModule.forFeature([
      { name: PostTypeMongoEntity.name, schema: PostTypeMongoSchema },
    ]),
  ],
  providers: [
    {
      provide: POST_TYPES_REPOSITORY,
      useFactory: (postTypeModel: Model<PostTypeMongoEntity>) => {
        return new PostTypesMongoRepository(postTypeModel);
      },
      inject: [getModelToken(PostTypeMongoEntity.name)],
    },
    {
      provide: PostTypeEntityFactory,
      useClass: PostTypeEntityFactory,
    },
    {
      provide: CreatePostTypesUseCase,
      useFactory: (
        postTypeEntityFactory: PostTypeEntityFactory,
        postTypesRepository: IPostTypesRepository,
      ) => {
        return new CreatePostTypesUseCase(
          postTypeEntityFactory,
          postTypesRepository,
        );
      },
      inject: [PostTypeEntityFactory, POST_TYPES_REPOSITORY],
    },
    {
      provide: DeletePostTypesUseCase,
      useFactory: (postTypesRepository: IPostTypesRepository) => {
        return new DeletePostTypesUseCase(postTypesRepository);
      },
      inject: [POST_TYPES_REPOSITORY],
    },
    {
      provide: SearchPostTypesUseCase,
      useFactory: (postTypesRepository: IPostTypesRepository) => {
        return new SearchPostTypesUseCase(postTypesRepository);
      },
      inject: [POST_TYPES_REPOSITORY],
    },
  ],
})
export class PostTypesModule {}
