import { Model, SortOrder } from 'mongoose';

import { MongoBaseRepository } from './mongo-base-repository';
import { MongoEntity } from '../../entities/mongo/mongo-entity';

import {
  InvalidOrderDirectionError,
  InvalidOrderFieldError,
  InvalidSearchFieldError,
  InvalidSearchOperatorError,
  InvalidSearchValueError,
} from '@/common/application/errors/application-errors';
import { IBaseEntityMapper } from '@/common/application/mappers/base-entity-mapper.interface';
import { Entity } from '@/common/domain/entities/entity';
import {
  DateOperators,
  FieldMap,
  FieldType,
  IBaseSearchRepository,
  NumberOperators,
  Order,
  RepositorySearchParams,
  RepositorySearchResponse,
  Search,
  StringOperators,
} from '@/common/domain/repositories/base-search-repository.interface';

export abstract class MongoBaseSearchRepository<
    DomainEntity extends Entity,
    DatabaseEntity extends MongoEntity,
  >
  extends MongoBaseRepository<DomainEntity, DatabaseEntity>
  implements IBaseSearchRepository<DomainEntity>
{
  constructor(
    entityMapper: IBaseEntityMapper<DomainEntity, DatabaseEntity>,
    entityModel: Model<DatabaseEntity>,
    private allowedFields: FieldMap<DatabaseEntity>,
  ) {
    super(entityMapper, entityModel);
  }

  async search({
    limitPerPage,
    pageNumber,
    search,
    order,
  }: RepositorySearchParams): Promise<RepositorySearchResponse<DomainEntity>> {
    const skipAmount = (pageNumber - 1) * limitPerPage;

    const resultsQuery = this.entityModel.countDocuments();
    const dataQuery = this.entityModel.find();

    if (search) {
      const searchFilters = this.buildSearchFilters(search);
      resultsQuery.where({ $and: searchFilters });
      dataQuery.where({ $and: searchFilters });
    }

    if (order) {
      const orderFilter = this.buildOrderFilter(order);
      dataQuery.sort(orderFilter);
    }

    dataQuery.limit(limitPerPage).skip(skipAmount);

    const [results, data] = await Promise.all([
      resultsQuery.exec(),
      dataQuery.exec(),
    ]);

    return {
      results,
      pages: Math.ceil(results / limitPerPage),
      data: data.map(this.entityMapper.toDomainEntity),
    };
  }

  private buildOrderFilter(order: Order): { [key: string]: SortOrder } {
    const field = order.field as keyof DatabaseEntity;

    const fieldType: FieldType | undefined = this.allowedFields[field];

    if (!fieldType) {
      throw new InvalidOrderFieldError();
    }

    const orderFilter: any = {};

    switch (order.direction) {
      case 'ASC':
        orderFilter[field] = 1;
        break;
      case 'DESC':
        orderFilter[field] = -1;
        break;
      default:
        throw new InvalidOrderDirectionError();
    }

    return orderFilter;
  }

  private buildSearchFilters(search: Search[]): any[] {
    const filters: any[] = [];

    search.forEach((input) => {
      const field = input.field as keyof DatabaseEntity;

      const fieldType: FieldType | undefined = this.allowedFields[field];

      if (!fieldType) {
        throw new InvalidSearchFieldError();
      }

      const filter: any = {};

      switch (fieldType) {
        case 'string':
          filter[field] = this.buildStringQuery(
            input.operator as StringOperators,
            input.value,
          );
          break;
        case 'number':
          filter[field] = this.buildNumberQuery(
            input.operator as NumberOperators,
            input.value,
          );
          break;
        case 'date':
          filter[field] = this.buildDateQuery(
            input.operator as DateOperators,
            input.value,
          );
          break;
      }

      filters.push(filter);
    });

    return filters;
  }

  private buildStringQuery(operator: StringOperators, value: string): object {
    switch (operator) {
      case 'contains':
        return { $regex: value, $options: 'i' };
      case 'equals':
        return { $eq: value };
      case 'startsWith':
        return { $regex: `^${value}`, $options: 'i' };
      case 'endsWith':
        return { $regex: `${value}$`, $options: 'i' };
      default:
        throw new InvalidSearchOperatorError();
    }
  }

  private buildNumberQuery(operator: NumberOperators, value: string): object {
    const numberValue = Number(value);

    if (isNaN(numberValue)) {
      throw new InvalidSearchValueError();
    }

    switch (operator) {
      case 'equals':
        return { $eq: numberValue };
      case 'greaterThan':
        return { $gt: numberValue };
      case 'lessThan':
        return { $lt: numberValue };
      default:
        throw new InvalidSearchOperatorError();
    }
  }

  private buildDateQuery(operator: DateOperators, value: string): object {
    const dateValue = new Date(value);

    if (isNaN(dateValue.getTime())) {
      throw new InvalidSearchValueError();
    }

    switch (operator) {
      case 'equals':
        return { $eq: dateValue };
      case 'greaterThan':
        return { $gt: dateValue };
      case 'lessThan':
        return { $lt: dateValue };
      default:
        throw new InvalidSearchOperatorError();
    }
  }
}
