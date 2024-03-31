import { IBaseRepository } from './base-repository.abstraction';
import { Entity } from '../entities/entity.abstraction';

export type RepositorySearch = {
  searchTerm?: string;
  limitPerPage: number;
  pageNumber: number;
};

export interface IBaseSearchRepository<T extends Entity>
  extends IBaseRepository<T> {
  search(params: RepositorySearch): Promise<T[]>;
}
