import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserMongoEntityMapper } from '../../models/mongo/users-mongo-model.mapper';
import { UserMongoEntity } from '../../models/mongo/users-mongo.model';
import { IUsersRepository } from '../users-repository.interface';

import { MongoBaseRepository } from '@/common/abstractions/repositories/mongo/mongo-base-repository.abstraction';
import { UserEntity } from '@/modules/users/entities/users.entity';

@Injectable()
export class UsersMongoRepository
  extends MongoBaseRepository<UserEntity, UserMongoEntity>
  implements IUsersRepository
{
  constructor(
    protected entityMapper: UserMongoEntityMapper,
    @InjectModel(UserMongoEntity.name)
    protected entityModel: Model<UserMongoEntity>,
  ) {
    super(entityMapper, entityModel);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const mongoEntity = await this.entityModel.findOne({ email });
    if (!mongoEntity) return null;
    return this.entityMapper.toDomainEntity(mongoEntity);
  }
}
