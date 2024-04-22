import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { MongoEntity } from '@/common/infrastructure/entities/mongo/mongo-entity';

export type SubjectMongoDocument = HydratedDocument<SubjectMongoEntity>;

@Schema({ collection: 'subjects' })
export class SubjectMongoEntity extends MongoEntity {
  @Prop()
  name: string;
}

export const SubjectMongoSchema =
  SchemaFactory.createForClass(SubjectMongoEntity);

SubjectMongoSchema.index(
  { name: 'text' },
  { unique: true, default_language: 'pt' },
);

export const SubjectMongoModel = mongoose.model('subjects', SubjectMongoSchema);
