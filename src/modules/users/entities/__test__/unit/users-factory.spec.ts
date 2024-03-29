import { faker } from '@faker-js/faker';

import { CreateUserProps, UsersFactory } from '../../users.factory';

import { COMUNICATIONS } from '@/common/enums/comunications.enum';
import { ROLES } from '@/common/enums/roles.enum';

describe('UsersFactory unit tests', () => {
  let usersFactory: UsersFactory;
  let userProps: CreateUserProps;

  beforeEach(() => {
    usersFactory = new UsersFactory();

    userProps = {
      email: faker.internet.email(),
      name: faker.internet.userName(),
      password: faker.internet.password(),
      _id: faker.database.mongodbObjectId(),
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
    };
  });

  it('Should create a user with all provided props', () => {
    const user = usersFactory.create(userProps);

    expect(user._id).toBe(userProps._id);
    expect(user.email).toBe(userProps.email);
    expect(user.name).toBe(userProps.name);
    expect(user.password).toBe(userProps.password);
    expect(user.comunications).toEqual(userProps.comunications);
    expect(user.email_is_verified).toBe(userProps.email_is_verified);
    expect(user.phone).toBe(userProps.phone);
    expect(user.photo_url).toBe(userProps.photo_url);
    expect(user.role).toBe(userProps.role);
    expect(user.subscriptions).toEqual(userProps.subscriptions);
  });
});
