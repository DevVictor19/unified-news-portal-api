import { Module } from '@nestjs/common';

import { PostsController } from './posts.controller';
import {
  CreatePostUseCase,
  DeletePostUseCase,
  FindByIdPostUseCase,
  SearchPostsUseCase,
  UpdatePostUseCase,
} from '../application/usecases';

@Module({
  controllers: [PostsController],
  providers: [
    CreatePostUseCase,
    DeletePostUseCase,
    FindByIdPostUseCase,
    SearchPostsUseCase,
    UpdatePostUseCase,
  ],
})
export class PostsModule {}
