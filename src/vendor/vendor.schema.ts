/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from '../product/product.schema';

export type VendorDocument = Vendor & Document;

@Schema({ timestamps: true })
export class Vendor {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: [{ type: String, ref: 'Product' }] })
    products: Product[]; // Array of Product references
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);

