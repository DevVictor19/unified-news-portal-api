import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { Entity } from '@/common/abstractions/entities/entity.abstraction';

@Schema()
export class Subject extends Entity {
  @Prop({ required: true, index: true })
  name: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);

export const SubjectModel = mongoose.model('subjects', SubjectSchema);
