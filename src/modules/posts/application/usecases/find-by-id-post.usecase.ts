import { Injectable } from '@nestjs/common';

import { PostsEntity } from '../../domain/entities/posts.entity';

import { NotFoundError } from '@/common/application/errors/application-errors';
import { IBaseUseCase } from '@/common/application/usecases/base-usecase.interface';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';

type Input = {
  post_id: string;
};

type Output = PostsEntity;

@Injectable()
export class FindByIdPostUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  async execute(input: Input): Promise<Output> {
    const post = await this.databaseService.posts.findById(input.post_id);

    if (!post) {
      throw new NotFoundError();
    }

    return post;
  }
}
