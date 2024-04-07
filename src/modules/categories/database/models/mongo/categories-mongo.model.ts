import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CategoryMongoDocument = HydratedDocument<CategoryMongoEntity>;

@Schema({ collection: 'categories' })
export class CategoryMongoEntity {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  created_at: Date;
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
