import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { Subscriptions } from '@/common/@types/users/subscriptions.type';
import { Entity } from '@/common/abstractions/entities/entity.abstraction';
import { COMUNICATIONS } from '@/common/enums/comunications.enum';
import { ROLES } from '@/common/enums/roles.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Entity {
  @Prop({ type: Number, default: ROLES.STUDENT })
  role: ROLES = ROLES.STUDENT;

  @Prop()
  photo_url?: string = undefined;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone?: string = undefined;

  @Prop()
  password: string;

  @Prop({ default: false })
  email_is_verified?: boolean = false;

  @Prop({
    type: {
      categories: [String],
      classes: [String],
      courses: [String],
      post_type: [String],
      subjects: [String],
    },
  })
  subscriptions: Subscriptions = {
    categories: [],
    classes: [],
    courses: [],
    post_type: [],
    subjects: [],
  };

  @Prop({ type: [String] })
  comunications: COMUNICATIONS[] = [];
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserModel = mongoose.model('users', UserSchema);
