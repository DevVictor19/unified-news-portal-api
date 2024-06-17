import { IBaseRepository } from './base-repository.interface';
import { Entity } from '../entities/entity';

export type StringOperators = 'equals' | 'contains' | 'startsWith' | 'endsWith';
export type NumberOperators = 'equals' | 'greaterThan' | 'lessThan';
export type DateOperators = 'equals' | 'greaterThan' | 'lessThan';
export type Operator = StringOperators | NumberOperators | DateOperators;

export type Search = {
  field: string;
  operator: Operator;
  value: string;
};

export type Order = {
  field: string;
  direction: 'ASC' | 'DESC';
};

export type RepositorySearchParams = {
  limitPerPage: number;
  pageNumber: number;
  search?: Search[];
  order?: Order;
};

export type RepositorySearchResponse<T extends Entity> = {
  results: number;
  pages: number;
  data: T[];
};

export abstract class IBaseSearchRepository<
  T extends Entity,
> extends IBaseRepository<T> {
  abstract search(
    params: RepositorySearchParams,
  ): Promise<RepositorySearchResponse<T>>;
}
