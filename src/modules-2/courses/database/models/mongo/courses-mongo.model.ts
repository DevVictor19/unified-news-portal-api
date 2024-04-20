import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { MongoEntity } from '@/common/abstractions/entities/mongo/mongo-entity.abstraction';

export type CourseMongoDocument = HydratedDocument<CourseMongoEntity>;

@Schema({ collection: 'courses' })
export class CourseMongoEntity extends MongoEntity {
  @Prop()
  name: string;
}

export const CourseMongoSchema =
  SchemaFactory.createForClass(CourseMongoEntity);

CourseMongoSchema.index(
  { name: 'text' },
  { unique: true, default_language: 'pt' },
);

export const CourseMongoModel = mongoose.model('courses', CourseMongoSchema);
