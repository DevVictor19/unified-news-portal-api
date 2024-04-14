import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { MongoEntity } from '@/common/abstractions/entities/mongo/mongo-entity.abstraction';

export type PostTypeMongoDocument = HydratedDocument<PostTypeMongoEntity>;

@Schema({ collection: 'post-types' })
export class PostTypeMongoEntity extends MongoEntity {
  @Prop()
  name: string;
}

export const PostTypeMongoSchema =
  SchemaFactory.createForClass(PostTypeMongoEntity);

PostTypeMongoSchema.index(
  { name: 'text' },
  { unique: true, default_language: 'pt' },
);

export const PostTypeMongoModel = mongoose.model(
  'post-types',
  PostTypeMongoSchema,
);
