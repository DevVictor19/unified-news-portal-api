import { UserEntity } from '../entities/users.entity';

import { IBaseSearchRepository } from '@/common/domain/repositories/base-search-repository.interface';

export abstract class IUsersRepository extends IBaseSearchRepository<UserEntity> {
  abstract findByEmail(email: string): Promise<UserEntity | null>;
}
