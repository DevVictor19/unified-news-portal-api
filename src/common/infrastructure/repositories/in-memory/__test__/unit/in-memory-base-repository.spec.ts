import { InMemoryBaseRepository } from '../../in-memory-base-repository';

import { Entity, EntityProps } from '@/common/domain/entities/entity';

type StubEntityProps = EntityProps & {
  prop1: string;
  prop2: string;
};

class StubEntity extends Entity {
  prop1: string;
  prop2: string;

  constructor(props: StubEntityProps) {
    const { prop1, prop2, created_at, id } = props;

    super({ created_at, id });
    Object.assign(this, { prop1, prop2 });
  }
}

class StubRepository extends InMemoryBaseRepository<StubEntity> {}

describe('InMemoryBaseRepository unit tests', () => {
  let sut: StubRepository;

  beforeEach(() => {
    sut = new StubRepository();
  });

  describe('Insert method', () => {
    it('Should insert a new item', async () => {
      const insertSpy = jest.spyOn(sut, 'insert');

      const entity = new StubEntity({ prop1: 'test', prop2: 'test' });

      await sut.insert(entity);

      expect(insertSpy).toHaveBeenCalled();
      expect(sut['items'][0]).toStrictEqual(entity);
    });
  });

  describe('FindAll method', () => {
    it('Should return all items', async () => {
      const findAllSpy = jest.spyOn(sut, 'findAll');

      const entity = new StubEntity({ prop1: 'test', prop2: 'test' });

      await sut.insert(entity);

      const items = await sut.findAll();

      expect(findAllSpy).toHaveBeenCalled();
      expect(items.length > 0).toBeTruthy();
      expect(items[0]).toStrictEqual(entity);
    });
  });

  describe('FindById method', () => {
    it('Should return null if not found any item', async () => {
      const findByIdSpy = jest.spyOn(sut, 'findById');

      const result = await sut.findById('id');

      expect(findByIdSpy).toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('Should return the item if found', async () => {
      const findByIdSpy = jest.spyOn(sut, 'findById');

      const entity = new StubEntity({ id: 'id', prop1: 'test', prop2: 'test' });

      await sut.insert(entity);

      const result = await sut.findById('id');

      expect(findByIdSpy).toHaveBeenCalled();
      expect(result).toStrictEqual(entity);
    });
  });

  describe('Update method', () => {
    it('Should update an item by id', async () => {
      const updateSpy = jest.spyOn(sut, 'update');

      const entity = new StubEntity({
        id: 'id',
        prop1: 'test',
        prop2: 'test',
      });

      await sut.insert(entity);

      const newEntity = new StubEntity({
        id: 'id',
        prop1: 'new prop1',
        prop2: 'new prop2',
      });

      await sut.update('id', newEntity);

      const result = await sut.findById('id');

      expect(updateSpy).toHaveBeenCalled();
      expect(result).toStrictEqual(newEntity);
    });

    it('Should not update an item if id missmatch', async () => {
      const updateSpy = jest.spyOn(sut, 'update');

      const entity = new StubEntity({
        id: 'id',
        prop1: 'test',
        prop2: 'test',
      });

      await sut.insert(entity);

      const newEntity = new StubEntity({
        id: 'id',
        prop1: 'new prop1',
        prop2: 'new prop2',
      });

      await sut.update('id2', newEntity);

      const result = await sut.findById('id');

      expect(updateSpy).toHaveBeenCalled();
      expect(result).toStrictEqual(entity);
    });
  });

  describe('Delete method', () => {
    it('should delete an item by id', async () => {
      const deleteSpy = jest.spyOn(sut, 'delete');

      const entity = new StubEntity({
        id: 'id',
        prop1: 'test',
        prop2: 'test',
      });

      await sut.insert(entity);

      expect(sut['items'][0]).toStrictEqual(entity);

      await sut.delete('id');

      expect(deleteSpy).toHaveBeenCalled();
      expect(sut['items'].length).toBe(0);
    });
  });
});
