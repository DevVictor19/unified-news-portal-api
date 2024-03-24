import { User } from '../../users.entity';

import { ROLES } from '@/common/enums/roles.enum';

describe('Users entity unit tests', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
  });

  it('Should create a instance of User', () => {
    expect(user).toBeInstanceOf(User);
  });

  it('Should initialize with student role as default', () => {
    expect(user.role).toBe(ROLES.STUDENT);
  });

  it('Should initialize with photo_url as undefined', () => {
    expect(user.photo_url).toBe(undefined);
  });

  it('Should initialize with phone as undefined', () => {
    expect(user.phone).toBe(undefined);
  });

  it('Should initialize with email_is_verified as false', () => {
    expect(user.email_is_verified).toBe(false);
  });

  it('Should initialize with subscriptions as an empty array', () => {
    expect(user.subscriptions.length).toBe(0);
  });

  it('Should initialize with comunications as an emtpy array', () => {
    expect(user.comunications.length).toBe(0);
  });
});
