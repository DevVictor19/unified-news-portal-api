export interface IBaseRepository<Entity extends object> {
  insert(entity: Entity): Promise<void>;
  findById(id: string): Promise<Entity | null>;
  findAll(): Promise<Entity[]>;
  update(id: string, entity: Entity): Promise<void>;
  delete(id: string): Promise<void>;
}
