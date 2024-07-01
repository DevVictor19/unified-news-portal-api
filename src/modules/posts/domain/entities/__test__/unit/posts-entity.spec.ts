import { faker } from '@faker-js/faker';

import { PostsEntity, PostsEntityProps } from '../../posts.entity';

describe('PostsEntity', () => {
  it('Should create a PostEntity with the given props', () => {
    const props: PostsEntityProps = {
      author: faker.string.sample(),
      title: faker.string.sample(),
      text: faker.string.sample(),
      user_id: faker.string.uuid(),
      media_url: faker.internet.url(),
      categories: [faker.string.sample()],
      courses: [faker.string.sample()],
      classes: [faker.string.sample()],
      subjects: [faker.string.sample()],
      post_types: [faker.string.sample()],
    };
    const entity = new PostsEntity(props);

    expect(entity).toBeInstanceOf(PostsEntity);
    expect(entity.author).toBe(props.author);
    expect(entity.title).toBe(props.title);
    expect(entity.text).toBe(props.text);
    expect(entity.user_id).toBe(props.user_id);
    expect(entity.media_url).toBe(props.media_url);
    expect(entity.categories).toEqual(props.categories);
    expect(entity.courses).toEqual(props.courses);
    expect(entity.classes).toEqual(props.classes);
    expect(entity.subjects).toEqual(props.subjects);
    expect(entity.post_types).toEqual(props.post_types);
  });

  it('Should create a PostEntity with the optional given props', () => {
    const props: PostsEntityProps = {
      author: faker.string.sample(),
      title: faker.string.sample(),
      text: faker.string.sample(),
      user_id: faker.string.uuid(),
    };
    const entity = new PostsEntity(props);

    expect(entity).toBeInstanceOf(PostsEntity);
    expect(entity.author).toBe(props.author);
    expect(entity.title).toBe(props.title);
    expect(entity.text).toBe(props.text);
    expect(entity.user_id).toBe(props.user_id);
    expect(entity.media_url).toBeNull();
    expect(entity.categories).toEqual([]);
    expect(entity.courses).toEqual([]);
    expect(entity.classes).toEqual([]);
    expect(entity.subjects).toEqual([]);
    expect(entity.post_types).toEqual([]);
  });
});
