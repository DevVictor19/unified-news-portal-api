import { Model } from 'mongoose';

import { UserMongoEntityMapper } from '../../models/mongo/users-mongo-model.mapper';
import { UserMongoEntity } from '../../models/mongo/users-mongo.model';
import { IUsersRepository } from '../users-repository.interface';

import { MongoBaseRepository } from '@/common/abstractions/repositories/mongo/mongo-base-repository.abstraction';
import { UserEntity } from '@/modules/users/entities/users.entity';

export class UsersMongoRepository
  extends MongoBaseRepository<UserEntity, UserMongoEntity>
  implements IUsersRepository
{
  constructor(protected usersModel: Model<UserMongoEntity>) {
    super(new UserMongoEntityMapper(), usersModel);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const mongoEntity = await this.usersModel.findOne({ email });
    if (!mongoEntity) return null;
    return this.entityMapper.toDomainEntity(mongoEntity);
  }
}
