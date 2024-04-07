import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ClassMongoDocument = HydratedDocument<ClassMongoEntity>;

@Schema({ collection: 'classes' })
export class ClassMongoEntity {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  created_at: Date;
}

export const ClassMongoSchema = SchemaFactory.createForClass(ClassMongoEntity);

ClassMongoSchema.index(
  { name: 'text' },
  { unique: true, default_language: 'pt' },
);

export const ClassMongoModel = mongoose.model('classes', ClassMongoSchema);
