import { InMemoryBaseRepository } from '@/common/infrastructure/repositories/in-memory/in-memory-base-repository';
import { UserEntity } from '@/modules/users/domain/entities/users.entity';
import { IUsersRepository } from '@/modules/users/domain/repositories/users-repository.interface';

export class UsersInMemoryRepository
  extends InMemoryBaseRepository<UserEntity>
  implements IUsersRepository
{
  constructor() {
    super();
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const existentUser = this.items.find((u) => u.email === email);

    if (!existentUser) {
      return null;
    }

    return existentUser;
  }
}
