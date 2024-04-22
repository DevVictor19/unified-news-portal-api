import { faker } from '@faker-js/faker';

import { UserEntity, UserEntityProps } from '../../users.entity';

import { COMUNICATIONS } from '@/common/domain/enums/comunications.enum';
import { ROLES } from '@/common/domain/enums/roles.enum';

describe('UserEntity unit tests', () => {
  it('Should create a UserEntity with email, name and password', () => {
    const props = {
      email: faker.internet.email(),
      name: faker.internet.userName(),
      password: faker.internet.password(),
    };

    const user = new UserEntity(props);

    expect(user).toBeInstanceOf(UserEntity);
    expect(user.email).toBe(props.email);
    expect(user.password).toBe(props.password);
  });

  it('Should initialize with student role if not provided', () => {
    const props = {
      email: faker.internet.email(),
      name: faker.internet.userName(),
      password: faker.internet.password(),
    };

    const user = new UserEntity(props);

    expect(user).toBeInstanceOf(UserEntity);
    expect(user.email).toBe(props.email);
    expect(user.password).toBe(props.password);
    expect(user.role).toBe(ROLES.STUDENT);
  });

  it('Should initialize email_is_verified with false if not provided', () => {
    const props = {
      email: faker.internet.email(),
      name: faker.internet.userName(),
      password: faker.internet.password(),
    };

    const user = new UserEntity(props);

    expect(user).toBeInstanceOf(UserEntity);
    expect(user.email).toBe(props.email);
    expect(user.password).toBe(props.password);
    expect(user.email_is_verified).toBe(false);
  });

  it('Should initialize subscriptions with empty arrays if not provided', () => {
    const props = {
      email: faker.internet.email(),
      name: faker.internet.userName(),
      password: faker.internet.password(),
    };

    const user = new UserEntity(props);

    expect(user).toBeInstanceOf(UserEntity);
    expect(user.email).toBe(props.email);
    expect(user.password).toBe(props.password);
    expect(user.subscriptions.categories.length).toBe(0);
    expect(user.subscriptions.classes.length).toBe(0);
    expect(user.subscriptions.courses.length).toBe(0);
    expect(user.subscriptions.post_type.length).toBe(0);
    expect(user.subscriptions.subjects.length).toBe(0);
  });

  it('Should initialize comunications with empty array if not provided', () => {
    const props = {
      email: faker.internet.email(),
      name: faker.internet.userName(),
      password: faker.internet.password(),
    };

    const user = new UserEntity(props);

    expect(user).toBeInstanceOf(UserEntity);
    expect(user.email).toBe(props.email);
    expect(user.password).toBe(props.password);
    expect(user.comunications.length).toBe(0);
  });

  it('Should create a UserEntity with all provided props', () => {
    const props: UserEntityProps = {
      email: faker.internet.email(),
      name: faker.internet.userName(),
      password: faker.internet.password(),
      id: faker.database.mongodbObjectId(),
      comunications: [COMUNICATIONS.EMAIL],
      email_is_verified: true,
      phone: faker.phone.number(),
      photo_url: faker.internet.url(),
      role: ROLES.ADMIN,
      subscriptions: {
        categories: ['Category'],
        classes: ['Class'],
        courses: ['Course'],
        post_type: ['Post_type'],
        subjects: ['Subject'],
      },
      created_at: faker.date.future(),
    };

    const user = new UserEntity(props);
    expect(user).toBeInstanceOf(UserEntity);
    expect(user.email).toBe(props.email);
    expect(user.password).toBe(props.password);
    expect(user.id).toBe(props.id);
    expect(user.email).toBe(props.email);
    expect(user.name).toBe(props.name);
    expect(user.password).toBe(props.password);
    expect(user.comunications).toEqual(props.comunications);
    expect(user.email_is_verified).toBe(props.email_is_verified);
    expect(user.phone).toBe(props.phone);
    expect(user.photo_url).toBe(props.photo_url);
    expect(user.role).toBe(props.role);
    expect(user.subscriptions).toEqual(props.subscriptions);
    expect(user.created_at).toEqual(props.created_at);
  });
});
