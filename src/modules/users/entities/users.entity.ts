import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { COMUNICATIONS } from '@/common/enums/comunications.enum';
import { ROLES } from '@/common/enums/roles.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  _id?: string;

  @Prop({ type: String, default: ROLES.STUDENT })
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

  @Prop({ type: [String] })
  subscriptions: string[] = [];

  @Prop({ type: [String] })
  comunications: COMUNICATIONS[] = [];
}

export const UserSchema = SchemaFactory.createForClass(User);

export const UserModel = mongoose.model('Users', UserSchema);
