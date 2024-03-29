import { Entity } from '../entities/entity.abstraction';

export interface IBaseRepository<T extends Entity> {
  insert(entity: T): Promise<void>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: string, entity: T): Promise<void>;
  delete(id: string): Promise<void>;
}
