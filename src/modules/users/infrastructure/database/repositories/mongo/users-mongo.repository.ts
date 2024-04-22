import { Model } from 'mongoose';

import { UserMongoEntityMapper } from '../../models/mongo/users-mongo-model.mapper';
import { UserMongoEntity } from '../../models/mongo/users-mongo.model';

import { MongoBaseRepository } from '@/common/infrastructure/repositories/mongo/mongo-base-repository';
import { UserEntity } from '@/modules/users/domain/entities/users.entity';
import { IUsersRepository } from '@/modules/users/domain/repositories/users-repository.interface';

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
