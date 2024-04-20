import { UserMongoEntity, UserMongoModel } from './users-mongo.model';

import { IBaseEntityMapper } from '@/common/abstractions/mappers/base-entity-mapper.abstraction';
import { UserEntity } from '@/modules/users/entities/users.entity';

export class UserMongoEntityMapper
  implements IBaseEntityMapper<UserEntity, UserMongoEntity>
{
  toDatabaseEntity(entity: UserEntity): UserMongoEntity {
    return new UserMongoModel({
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
    });
  }

  toDomainEntity(entity: UserMongoEntity): UserEntity {
    return new UserEntity({
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
}
