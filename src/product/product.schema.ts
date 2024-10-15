/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
    @Prop({ type: String, default: uuidv4, unique: true })
    id: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    stock: number;

    @Prop({ type: String, ref: 'Category' })
    categoryId: string; // FK to Category

    @Prop({ type: String, ref: 'Vendor' })
    vendorId: string; // FK to Vendor
}

export const ProductSchema = SchemaFactory.createForClass(Product);
