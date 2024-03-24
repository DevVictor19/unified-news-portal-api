import { User } from '../entities/users.entity';

import { IBaseRepository } from '@/common/abstractions/repositories/base-repository.abstraction';

export interface IUsersRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
