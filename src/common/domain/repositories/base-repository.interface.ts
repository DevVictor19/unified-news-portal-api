import { Entity } from '../entities/entity';

export abstract class IBaseRepository<T extends Entity> {
  abstract insert(entity: T): Promise<void>;
  abstract findById(id: string): Promise<T | null>;
  abstract findAll(): Promise<T[]>;
  abstract update(id: string, entity: T): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
