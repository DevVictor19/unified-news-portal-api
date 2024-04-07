import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PostTypeMongoDocument = HydratedDocument<PostTypeMongoEntity>;

@Schema({ collection: 'post-types' })
export class PostTypeMongoEntity {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  created_at: Date;
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
