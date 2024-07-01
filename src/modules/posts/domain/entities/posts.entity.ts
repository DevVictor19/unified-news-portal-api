import { Entity, EntityProps } from '@/common/domain/entities/entity';

export type PostsEntityProps = EntityProps & {
  user_id: string;
  author: string;
  title: string;
  text: string;
  media_url?: string | null;
  categories?: string[];
  courses?: string[];
  classes?: string[];
  subjects?: string[];
  post_types?: string[];
};

export class PostsEntity extends Entity {
  user_id: string;
  author: string;
  title: string;
  text: string;
  media_url: string | null = null;
  categories: string[] = [];
  courses: string[] = [];
  classes: string[] = [];
  subjects: string[] = [];
  post_types: string[] = [];

  constructor(props: PostsEntityProps) {
    const { created_at, id, ...rest } = props;
    super({ created_at, id });
    Object.assign(this, rest);
  }
}
