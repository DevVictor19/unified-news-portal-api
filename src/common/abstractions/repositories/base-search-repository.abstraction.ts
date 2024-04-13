import { IBaseRepository } from './base-repository.abstraction';
import { Entity } from '../entities/entity.abstraction';

export type RepositorySearch = {
  searchTerm?: string;
  limitPerPage: number;
  pageNumber: number;
};

export abstract class IBaseSearchRepository<
  T extends Entity,
> extends IBaseRepository<T> {
  abstract search(params: RepositorySearch): Promise<T[]>;
}
