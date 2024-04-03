import { Model } from 'mongoose';

import { UserMongoEntityMapper } from '../../models/mongo/users-mongo-model.mapper';
import { UserMongoEntity } from '../../models/mongo/users-mongo.model';
import { IUsersRepository } from '../users-repository.interface';

import { UserEntity } from '@/modules/users/entities/users.entity';

export class UsersMongoRepository implements IUsersRepository {
  constructor(private userModel: Model<UserMongoEntity>) {}

  async insert(entity: UserEntity): Promise<void> {
    const mongoEntity = UserMongoEntityMapper.toMongoEntity(entity);
    const createdUser = new this.userModel(mongoEntity);
    await createdUser.save();
  }

  async findAll(): Promise<UserEntity[]> {
    const results = await this.userModel.find();
    return results.map((mongoEntity) =>
      UserMongoEntityMapper.toDomainEntity(mongoEntity),
    );
  }

  async findById(id: string): Promise<UserEntity | null> {
    const mongoEntity = await this.userModel.findById(id);
    if (!mongoEntity) return null;
    return UserMongoEntityMapper.toDomainEntity(mongoEntity);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const mongoEntity = await this.userModel.findOne({ email });
    if (!mongoEntity) return null;
    return UserMongoEntityMapper.toDomainEntity(mongoEntity);
  }

  async update(id: string, entity: UserEntity): Promise<void> {
    const mongoEntity = UserMongoEntityMapper.toMongoEntity(entity);
    await this.userModel.findByIdAndUpdate(id, mongoEntity);
  }

  async delete(id: string): Promise<void> {
    await this.userModel.deleteOne({ _id: id });
  }
}
