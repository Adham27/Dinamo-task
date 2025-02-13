/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
    save() {
        throw new Error('Method not implemented.');
    }
    @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
    userId: Types.ObjectId;

    @Prop([
        {
            productId: { type: Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, default: 1 },
        },
    ])
    items: {
        productId: Types.ObjectId;
        quantity: number;
    }[];

    @Prop({ default: 0 })
    totalPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
