import { faker } from '@faker-js/faker';

import { UserEntity, UserEntityProps } from '../../users.entity';
import { UserEntityFactory } from '../../users.factory';

import { COMUNICATIONS } from '@/common/enums/comunications.enum';
import { ROLES } from '@/common/enums/roles.enum';

describe('UserEntityFactory unit tests', () => {
  let usersFactory: UserEntityFactory;
  let userProps: UserEntityProps;

  beforeEach(() => {
    usersFactory = new UserEntityFactory();

    userProps = {
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
  });

  it('Should create a UserEntity with all provided props', () => {
    const user = usersFactory.create(userProps);

    expect(user).toBeInstanceOf(UserEntity);
    expect(user.id).toBe(userProps.id);
    expect(user.email).toBe(userProps.email);
    expect(user.name).toBe(userProps.name);
    expect(user.password).toBe(userProps.password);
    expect(user.comunications).toEqual(userProps.comunications);
    expect(user.email_is_verified).toBe(userProps.email_is_verified);
    expect(user.phone).toBe(userProps.phone);
    expect(user.photo_url).toBe(userProps.photo_url);
    expect(user.role).toBe(userProps.role);
    expect(user.subscriptions).toEqual(userProps.subscriptions);
    expect(user.created_at).toEqual(userProps.created_at);
  });
});
