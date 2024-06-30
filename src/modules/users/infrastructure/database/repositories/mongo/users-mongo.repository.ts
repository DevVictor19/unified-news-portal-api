import { Model } from 'mongoose';

import { UserMongoEntityMapper } from '../../models/mongo/users-mongo-model.mapper';
import { UserMongoEntity } from '../../models/mongo/users-mongo.model';

import { MongoBaseSearchRepository } from '@/common/infrastructure/repositories/mongo/mongo-base-search-repository';
import { UserEntity } from '@/modules/users/domain/entities/users.entity';
import { IUsersRepository } from '@/modules/users/domain/repositories/users-repository.interface';

export class UsersMongoRepository
  extends MongoBaseSearchRepository<UserEntity, UserMongoEntity>
  implements IUsersRepository
{
  constructor(usersModel: Model<UserMongoEntity>) {
    super(new UserMongoEntityMapper(), usersModel, {
      email: 'string',
      name: 'string',
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const mongoEntity = await this.entityModel.findOne({ email });
    if (!mongoEntity) return null;
    return this.entityMapper.toDomainEntity(mongoEntity);
  }
}
