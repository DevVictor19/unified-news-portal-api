import { FilterQuery, Model } from 'mongoose';

import { MongoBaseRepository } from './mongo-base-repository';
import { MongoEntity } from '../../entities/mongo/mongo-entity';

import { IBaseEntityMapper } from '@/common/application/mappers/base-entity-mapper.interface';
import { Entity } from '@/common/domain/entities/entity';
import {
  IBaseSearchRepository,
  RepositorySearch,
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
  ) {
    super(entityMapper, entityModel);
  }

  async search({
    limitPerPage,
    pageNumber,
    searchTerm,
  }: RepositorySearch): Promise<DomainEntity[]> {
    const skipAmount = (pageNumber - 1) * limitPerPage;

    if (searchTerm) {
      const results = await this.entityModel
        .find(
          { $text: { $search: searchTerm } } as FilterQuery<DatabaseEntity>,
          {
            score: { $meta: 'textScore' },
          },
        )
        .sort({ score: { $meta: 'textScore' } })
        .skip(skipAmount)
        .limit(limitPerPage);

      return results.map((mongoEntity) =>
        this.entityMapper.toDomainEntity(mongoEntity),
      );
    }

    const results = await this.entityModel
      .find()
      .skip(skipAmount)
      .limit(limitPerPage);

    return results.map((mongoEntity) =>
      this.entityMapper.toDomainEntity(mongoEntity),
    );
  }
}
