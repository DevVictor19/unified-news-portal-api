import { UserEntity } from '../entities/users.entity';

import { IBaseRepository } from '@/common/domain/repositories/base-repository.interface';

export abstract class IUsersRepository extends IBaseRepository<UserEntity> {
  abstract findByEmail(email: string): Promise<UserEntity | null>;
}
