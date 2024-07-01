import { Injectable } from '@nestjs/common';

import {
  ForbiddenError,
  NotFoundError,
} from '@/common/application/errors/application-errors';
import { IBaseUseCase } from '@/common/application/usecases/base-usecase.interface';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';

type Input = {
  post_id: string;
  user_id: string;
  payload: {
    text: string;
    title: string;
    categories: string[];
    courses: string[];
    classes: string[];
    subjects: string[];
    post_types: string[];
  };
};

type Output = void;

@Injectable()
export class UpdatePostUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  async execute(input: Input): Promise<Output> {
    const [post, user] = await Promise.all([
      this.databaseService.posts.findById(input.post_id),
      this.databaseService.users.findById(input.user_id),
    ]);

    if (!post || !user) {
      throw new NotFoundError();
    }

    const isOwner = post.user_id === user.id;

    if (!isOwner) {
      throw new ForbiddenError();
    }

    Object.assign(post, input.payload);

    await this.databaseService.posts.update(input.post_id, post);
  }
}
