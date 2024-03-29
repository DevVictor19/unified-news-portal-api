import { Entity } from '../../entity.abstraction';

class StubEntity extends Entity {}

describe('Entity abstraction unit tests', () => {
  let sut: StubEntity;

  beforeEach(() => {
    sut = new StubEntity();
  });

  it('Should initialize with id as undefined', () => {
    expect(sut._id).toBe(undefined);
  });

  it('Should initialize with current date', () => {
    expect(sut.created_at).toBeInstanceOf(Date);
  });
});
