import { Module } from '@nestjs/common';

import { PostsAdminController } from './posts-admin.controller';
import { PostsController } from './posts.controller';
import {
  CreatePostUseCase,
  DeleteAnyPostUseCase,
  DeletePostUseCase,
  FindByIdPostUseCase,
  SearchPostsUseCase,
  UpdateAnyPostUseCase,
  UpdatePostUseCase,
} from '../application/usecases';

@Module({
  controllers: [PostsController, PostsAdminController],
  providers: [
    CreatePostUseCase,
    DeletePostUseCase,
    FindByIdPostUseCase,
    SearchPostsUseCase,
    UpdatePostUseCase,
    DeleteAnyPostUseCase,
    UpdateAnyPostUseCase,
  ],
})
export class PostsModule {}
