import { IBaseRepository } from './base-repository.interface';
import { Entity } from '../entities/entity';

export type StringOperators = 'equals' | 'contains' | 'startsWith' | 'endsWith';
export type NumberOperators = 'equals' | 'greaterThan' | 'lessThan';
export type DateOperators = 'equals' | 'greaterThan' | 'lessThan';
export type ArrayOperators = 'contains';
export type Operator =
  | StringOperators
  | NumberOperators
  | DateOperators
  | ArrayOperators;

export type FieldType = 'string' | 'number' | 'date' | 'array';

export type FieldMap<T> = {
  [key in keyof T]: FieldType;
};

export type Search = {
  field: string;
  operator: Operator;
  value: string | string[];
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
