import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { MongoEntity } from '@/common/abstractions/entities/mongo/mongo-entity.abstraction';

export type ClassMongoDocument = HydratedDocument<ClassMongoEntity>;

@Schema({ collection: 'classes' })
export class ClassMongoEntity extends MongoEntity {
  @Prop()
  name: string;
}

export const ClassMongoSchema = SchemaFactory.createForClass(ClassMongoEntity);

ClassMongoSchema.index(
  { name: 'text' },
  { unique: true, default_language: 'pt' },
);

export const ClassMongoModel = mongoose.model('classes', ClassMongoSchema);
