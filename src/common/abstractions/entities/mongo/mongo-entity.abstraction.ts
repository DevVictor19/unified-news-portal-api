import { Prop } from '@nestjs/mongoose';

export class MongoEntity {
  @Prop()
  _id: string;

  @Prop({ default: new Date() })
  created_at: Date;
}
