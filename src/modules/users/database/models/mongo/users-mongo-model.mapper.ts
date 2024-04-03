import { UserMongoEntity } from './users-mongo.model';

import { UserEntity } from '@/modules/users/entities/users.entity';
import { UserEntityFactory } from '@/modules/users/entities/users.factory';

export class UserMongoEntityMapper {
  static toDomainEntity(entity: UserMongoEntity): UserEntity {
    return new UserEntityFactory().create({
      id: entity._id,
      comunications: entity.comunications,
      email: entity.email,
      email_is_verified: entity.email_is_verified,
      name: entity.name,
      password: entity.password,
      role: entity.role,
      subscriptions: entity.subscriptions,
      created_at: entity.created_at,
      phone: entity.phone,
      photo_url: entity.photo_url,
    });
  }

  static toMongoEntity(entity: UserEntity): UserMongoEntity {
    return {
      _id: entity.id,
      comunications: entity.comunications,
      email: entity.email,
      email_is_verified: entity.email_is_verified,
      name: entity.name,
      password: entity.password,
      role: entity.role,
      subscriptions: entity.subscriptions,
      created_at: entity.created_at,
      phone: entity.phone,
      photo_url: entity.photo_url,
    };
  }
}
