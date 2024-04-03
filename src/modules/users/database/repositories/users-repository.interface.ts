import { UserEntity } from '../../entities/users.entity';

import { IBaseRepository } from '@/common/abstractions/repositories/base-repository.abstraction';

export interface IUsersRepository extends IBaseRepository<UserEntity> {
  findByEmail(email: string): Promise<UserEntity | null>;
}
