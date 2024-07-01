import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { MongoEntity } from '@/common/infrastructure/entities/mongo/mongo-entity';

@Schema({ collection: 'posts' })
export class PostsMongoEntity extends MongoEntity {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  text: string;

  @Prop({ type: String, default: null })
  media_url: string | null = null;

  @Prop({ type: [String], default: [] })
  categories: string[] = [];

  @Prop({ type: [String], default: [] })
  courses: string[] = [];

  @Prop({ type: [String], default: [] })
  classes: string[] = [];

  @Prop({ type: [String], default: [] })
  subjects: string[] = [];

  @Prop({ type: [String], default: [] })
  post_types: string[] = [];
}

export const PostsMongoSchema = SchemaFactory.createForClass(PostsMongoEntity);

export const PostsMongoModel = mongoose.model('posts', PostsMongoSchema);
