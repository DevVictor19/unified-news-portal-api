import { Prop } from '@nestjs/mongoose';

export abstract class Entity {
  @Prop()
  _id?: string;

  @Prop({ default: new Date() })
  created_at: Date = new Date();
}
