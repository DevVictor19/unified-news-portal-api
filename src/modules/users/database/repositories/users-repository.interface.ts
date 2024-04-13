import { UserEntity } from '../../entities/users.entity';

import { IBaseRepository } from '@/common/abstractions/repositories/base-repository.abstraction';

export abstract class IUsersRepository extends IBaseRepository<UserEntity> {
  abstract findByEmail(email: string): Promise<UserEntity | null>;
}
