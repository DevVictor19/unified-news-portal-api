import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { Subscriptions } from '@/common/@types/users/subscriptions.type';
import { COMUNICATIONS } from '@/common/enums/comunications.enum';
import { ROLES } from '@/common/enums/roles.enum';

export type UserMongoDocument = HydratedDocument<UserMongoEntity>;

@Schema({ collection: 'users' })
export class UserMongoEntity {
  @Prop()
  _id: string;

  @Prop({ type: Number, default: ROLES.STUDENT })
  role: ROLES = ROLES.STUDENT;

  @Prop()
  photo_url?: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone?: string;

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

  @Prop()
  created_at: Date;
}

export const UserMongoSchema = SchemaFactory.createForClass(UserMongoEntity);

export const UserMongoModel = mongoose.model('users', UserMongoSchema);
