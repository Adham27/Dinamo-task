/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
    @Prop({ type: String, default: uuidv4, unique: true })
    id: string;

    @Prop({ required: true })
    totalAmount: number;

    @Prop({ required: true })
    status: string;

    @Prop({ type: [{ type: String, ref: 'Product' }] })
    items: string[]; // Array of Products

    @Prop({ type: String, ref: 'User' })
    userId: string; // FK to User
}

export const OrderSchema = SchemaFactory.createForClass(Order);
