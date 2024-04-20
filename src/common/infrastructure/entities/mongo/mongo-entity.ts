import { Prop } from '@nestjs/mongoose';

export abstract class MongoEntity {
  @Prop()
  _id: string;

  @Prop({ default: new Date() })
  created_at: Date;
}
