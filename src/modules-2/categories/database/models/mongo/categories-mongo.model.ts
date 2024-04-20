import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { MongoEntity } from '@/common/abstractions/entities/mongo/mongo-entity.abstraction';

export type CategoryMongoDocument = HydratedDocument<CategoryMongoEntity>;

@Schema({ collection: 'categories' })
export class CategoryMongoEntity extends MongoEntity {
  @Prop()
  name: string;
}

export const CategoryMongoSchema =
  SchemaFactory.createForClass(CategoryMongoEntity);

CategoryMongoSchema.index(
  { name: 'text' },
  { unique: true, default_language: 'pt' },
);

export const CategoryMongoModel = mongoose.model(
  'categories',
  CategoryMongoSchema,
);
