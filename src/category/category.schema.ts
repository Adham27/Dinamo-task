/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
    @Prop({ type: String, default: uuidv4, unique: true })
    id: string;

    @Prop({ required: true, unique: true })
    title: string;

    @Prop()
    description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
