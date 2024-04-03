import { IUsersRepository } from '../users-repository.interface';

import { UserEntity } from '@/modules/users/entities/users.entity';

export class UsersInMemoryRepository implements IUsersRepository {
  users: UserEntity[] = [];

  async insert(entity: UserEntity): Promise<void> {
    this.users.push(entity);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.users;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const existentUser = this.users.find((u) => u.email === email);

    if (!existentUser) {
      return null;
    }

    return existentUser;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const existentUser = this.users.find((u) => u.id === id);

    if (!existentUser) {
      return null;
    }

    return existentUser;
  }

  async update(id: string, entity: UserEntity): Promise<void> {
    const existentUser = this.users.find((u) => u.id === id);

    if (!existentUser) {
      return;
    }

    Object.assign(existentUser, entity);
  }

  async delete(id: string): Promise<void> {
    const updatedUsers = this.users.filter((u) => u.id !== id);
    this.users = updatedUsers;
  }
}
