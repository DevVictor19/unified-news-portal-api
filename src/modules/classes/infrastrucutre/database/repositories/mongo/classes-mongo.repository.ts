import { Model } from 'mongoose';

import { ClassMongoEntityMapper } from '../../models/mongo/classes-mongo-model.mapper';
import { ClassMongoEntity } from '../../models/mongo/classes-mongo.model';

import { MongoBaseSearchRepository } from '@/common/infrastructure/repositories/mongo/mongo-base-search-repository';
import { ClassEntity } from '@/modules/classes/domain/entities/classes.entity';
import { IClassesRepository } from '@/modules/classes/domain/repositories/classes-repository.interface';

export class ClassesMongoRepository
  extends MongoBaseSearchRepository<ClassEntity, ClassMongoEntity>
  implements IClassesRepository
{
  constructor(classesModel: Model<ClassMongoEntity>) {
    super(new ClassMongoEntityMapper(), classesModel, {
      _id: 'string',
      name: 'string',
      created_at: 'date',
    });
  }

  async findByName(name: string): Promise<ClassEntity | null> {
    const result = await this.entityModel.findOne({ name });
    if (!result) return null;
    return this.entityMapper.toDomainEntity(result);
  }
}
