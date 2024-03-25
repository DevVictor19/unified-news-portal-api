import { Model } from 'mongoose';

import { User } from '../../entities/users.entity';
import { IUsersRepository } from '../users-repository.interface';

export class UsersMongoRepository implements IUsersRepository {
  constructor(private userModel: Model<User>) {}

  async insert(entity: User): Promise<void> {
    const createdUser = new this.userModel(entity);
    await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async update(id: string, entity: User): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, entity);
  }

  async delete(id: string): Promise<void> {
    await this.userModel.deleteOne({ _id: id });
  }
}
