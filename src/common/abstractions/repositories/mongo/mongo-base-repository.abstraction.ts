import { FilterQuery, Model } from 'mongoose';

import { Entity } from '../../entities/entity.abstraction';
import { MongoEntity } from '../../entities/mongo/mongo-entity.abstraction';
import { IBaseEntityMapper } from '../../mappers/base-entity-mapper.abstraction';
import { IBaseRepository } from '../base-repository.abstraction';

export abstract class MongoBaseRepository<
  DomainEntity extends Entity,
  DatabaseEntity extends MongoEntity,
> implements IBaseRepository<DomainEntity>
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
    await this.entityModel.deleteOne({
      _id: id,
    } as FilterQuery<DatabaseEntity>);
  }
}
