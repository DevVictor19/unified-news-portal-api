import { User } from '../../entities/users.entity';
import { IUsersRepository } from '../users-repository.interface';

export class UsersInMemoryRepository implements IUsersRepository {
  users: User[] = [];

  async insert(entity: User): Promise<void> {
    this.users.push(entity);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findByEmail(email: string): Promise<User | null> {
    const existentUser = this.users.find((u) => u.email === email);

    if (!existentUser) {
      return null;
    }

    return existentUser;
  }

  async findById(id: string): Promise<User | null> {
    const existentUser = this.users.find((u) => u._id === id);

    if (!existentUser) {
      return null;
    }

    return existentUser;
  }

  async update(id: string, entity: User): Promise<void> {
    const existentUser = this.users.find((u) => u._id === id);

    if (!existentUser) {
      return;
    }

    Object.assign(existentUser, entity);
  }

  async delete(id: string): Promise<void> {
    const updatedUsers = this.users.filter((u) => u._id !== id);
    this.users = updatedUsers;
  }
}
