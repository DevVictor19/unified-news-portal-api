import { PostTypeEntity, PostTypeEntityProps } from './post-types.entity';

export class PostTypeEntityFactory {
  create(props: PostTypeEntityProps): PostTypeEntity {
    return new PostTypeEntity(props);
  }
}
