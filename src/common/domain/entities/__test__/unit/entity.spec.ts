import { faker } from '@faker-js/faker';

import { Entity } from '../../entity';

class StubEntity extends Entity {}

describe('Entity abstraction unit tests', () => {
  it('Should initialize id with uuid if not provided', () => {
    const entity = new StubEntity({});
    expect(typeof entity.id).toBe('string');
  });

  it('Should initialize id with provided id', () => {
    const props = { id: faker.database.mongodbObjectId() };
    const entity = new StubEntity(props);
    expect(entity.id).toBe(props.id);
  });

  it('Should initialize created_at with current date', () => {
    const entity = new StubEntity({});
    expect(entity.created_at).toBeInstanceOf(Date);
  });

  it('Should initialize created_at with provided date', () => {
    const props = { created_at: faker.date.future() };
    const entity = new StubEntity(props);
    expect(entity.created_at).toEqual(props.created_at);
  });
});
