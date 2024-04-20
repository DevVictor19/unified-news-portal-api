import { Model } from 'mongoose';

import { ClassMongoEntityMapper } from '../../models/mongo/classes-mongo-model.mapper';
import { ClassMongoEntity } from '../../models/mongo/classes-mongo.model';
import { IClassesRepository } from '../classes-repository.interface';

import { MongoBaseSearchRepository } from '@/common/abstractions/repositories/mongo/mongo-base-search-repository.abstraction';
import { ClassEntity } from '@/modules/classes/entities/classes.entity';

export class ClassesMongoRepository
  extends MongoBaseSearchRepository<ClassEntity, ClassMongoEntity>
  implements IClassesRepository
{
  constructor(protected classesModel: Model<ClassMongoEntity>) {
    super(new ClassMongoEntityMapper(), classesModel);
  }

  async findByName(name: string): Promise<ClassEntity | null> {
    const result = await this.classesModel.findOne({ name });
    if (!result) return null;
    return this.entityMapper.toDomainEntity(result);
  }
}
