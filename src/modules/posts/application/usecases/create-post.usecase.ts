import { Injectable } from '@nestjs/common';

import { PostsEntity } from '../../domain/entities/posts.entity';

import { BadRequestError } from '@/common/application/errors/application-errors';
import { IBaseUseCase } from '@/common/application/usecases/base-usecase.interface';
import { IDatabaseService } from '@/modules/common/database/application/services/database-service.interface';

type Input = {
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
export class CreatePostUseCase implements IBaseUseCase<Input, Output> {
  constructor(private databaseService: IDatabaseService) {}

  async execute(input: Input): Promise<Output> {
    const user = await this.databaseService.users.findById(input.user_id);

    if (!user) {
      throw new BadRequestError();
    }

    const post = new PostsEntity({
      author: user.name,
      text: input.payload.text,
      title: input.payload.title,
      user_id: user.id,
      categories: input.payload.categories,
      classes: input.payload.classes,
      courses: input.payload.courses,
      subjects: input.payload.subjects,
      post_types: input.payload.post_types,
    });

    await this.databaseService.posts.insert(post);
  }
}
