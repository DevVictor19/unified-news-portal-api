import { PostTypeEntity } from '../../domain/entities/post-types.entity';

export class PostTypesPresenter {
  static format(input: PostTypeEntity) {
    return {
      id: input.id,
      name: input.name,
      created_at: input.created_at,
    };
  }
}
