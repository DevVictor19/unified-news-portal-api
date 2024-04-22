import { Module } from '@nestjs/common';

import { PostTypesController } from './post-types.controller';
import {
  CreatePostTypesUseCase,
  DeletePostTypesUseCase,
  SearchPostTypesUseCase,
} from '../application/usecases';

@Module({
  controllers: [PostTypesController],
  providers: [
    CreatePostTypesUseCase,
    DeletePostTypesUseCase,
    SearchPostTypesUseCase,
  ],
})
export class PostTypesModule {}
