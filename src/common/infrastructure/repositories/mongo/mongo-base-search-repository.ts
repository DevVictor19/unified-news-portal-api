import { FilterQuery, Model } from 'mongoose';

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
> implements IBaseSearchRepository<DomainEntity>
{
  constructor(
    protected entityMapper: IBaseEntityMapper<DomainEntity, DatabaseEntity>,
    protected entityModel: Model<DatabaseEntity>,
  ) {}

  async insert(entity: DomainEntity): Promise<void> {
    const mongoEntity = this.entityMapper.toDatabaseEntity(entity);
    const createdUser = new this.entityModel(mongoEntity);
    await createdUser.save();
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

  async findAll(): Promise<DomainEntity[]> {
    const results = await this.entityModel.find();
    return results.map((mongoEntity) =>
      this.entityMapper.toDomainEntity(mongoEntity),
    );
  }

  async findById(id: string): Promise<DomainEntity | null> {
    const mongoEntity = await this.entityModel.findById(id);
    if (!mongoEntity) return null;
    return this.entityMapper.toDomainEntity(mongoEntity);
  }

  async update(id: string, entity: DomainEntity): Promise<void> {
    const mongoEntity = this.entityMapper.toDatabaseEntity(entity);
    await this.entityModel.findByIdAndUpdate(id, mongoEntity);
  }

  async delete(id: string): Promise<void> {
    await this.entityModel.deleteOne({ _id: id } as any);
  }
}
