import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { Subscriptions } from '@/common/domain/@types/subscriptions';
import { COMUNICATIONS } from '@/common/domain/enums/comunications.enum';
import { ROLES } from '@/common/domain/enums/roles.enum';
import { MongoEntity } from '@/common/infrastructure/entities/mongo/mongo-entity';

export type UserMongoDocument = HydratedDocument<UserMongoEntity>;

@Schema({ collection: 'users' })
export class UserMongoEntity extends MongoEntity {
  @Prop({ type: Number, default: ROLES.STUDENT })
  role: ROLES = ROLES.STUDENT;

  @Prop({ type: String, default: null })
  photo_url: string | null;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ type: String, default: null })
  phone: string | null;

  @Prop()
  password: string;

  @Prop()
  email_is_verified: boolean;

  @Prop({
    type: {
      categories: [String],
      classes: [String],
      courses: [String],
      post_type: [String],
      subjects: [String],
    },
  })
  subscriptions: Subscriptions;

  @Prop({ type: [String] })
  comunications: COMUNICATIONS[];
}

export const UserMongoSchema = SchemaFactory.createForClass(UserMongoEntity);

export const UserMongoModel = mongoose.model('users', UserMongoSchema);
