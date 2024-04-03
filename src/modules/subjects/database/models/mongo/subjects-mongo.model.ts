import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SubjectMongoDocument = HydratedDocument<SubjectMongoEntity>;

@Schema({ collection: 'subjects' })
export class SubjectMongoEntity {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  created_at: Date;
}

export const SubjectMongoSchema =
  SchemaFactory.createForClass(SubjectMongoEntity);

SubjectMongoSchema.index(
  { name: 'text' },
  { unique: true, default_language: 'pt' },
);

export const SubjectMongoModel = mongoose.model('subjects', SubjectMongoSchema);
