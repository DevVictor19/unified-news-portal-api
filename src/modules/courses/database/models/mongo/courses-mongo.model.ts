import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CourseMongoDocument = HydratedDocument<CourseMongoEntity>;

@Schema({ collection: 'courses' })
export class CourseMongoEntity {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  created_at: Date;
}

export const CourseMongoSchema =
  SchemaFactory.createForClass(CourseMongoEntity);

CourseMongoSchema.index(
  { name: 'text' },
  { unique: true, default_language: 'pt' },
);

export const CourseMongoModel = mongoose.model('courses', CourseMongoSchema);
