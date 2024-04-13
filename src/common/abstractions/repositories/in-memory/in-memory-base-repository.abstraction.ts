import { Entity } from '../../entities/entity.abstraction';
import { IBaseRepository } from '../base-repository.abstraction';

export abstract class InMemoryBaseRepository<T extends Entity>
  implements IBaseRepository<T>
{
  protected items: T[] = [];

  async insert(entity: T): Promise<void> {
    this.items.push(entity);
  }

  async findAll(): Promise<T[]> {
    return this.items;
  }

  async findById(id: string): Promise<T | null> {
    const existentItem = this.items.find((u) => u.id === id);

    if (!existentItem) {
      return null;
    }

    return existentItem;
  }

  async update(id: string, entity: T): Promise<void> {
    const existentItem = this.items.find((u) => u.id === id);

    if (!existentItem) {
      return;
    }

    Object.assign(existentItem, entity);
  }

  async delete(id: string): Promise<void> {
    const updatedItems = this.items.filter((u) => u.id !== id);
    this.items = updatedItems;
  }
}
