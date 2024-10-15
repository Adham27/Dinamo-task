/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Cart, CartDocument } from './cart.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
    CreateCartDto,
    AddCartItemDto,
    UpdateCartItemDto,
    RemoveCartItemDto,
} from '../dtos/cart.dto';

@Injectable()
export class CartService extends BaseService<CartDocument> {
    constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {
        super(cartModel);
    }

    // Get Cart by User ID
    async getCartByUserId(userId: string): Promise<Cart> {
        return this.cartModel
            .findOne({ userId: new Types.ObjectId(userId) })
            .populate('items.productId')
            .exec();
    }

    // Create a new Cart
    async createCart(createCartDto: CreateCartDto): Promise<Cart> {
        const existingCart = await this.getCartByUserId(createCartDto.userId);
        if (existingCart) {
            throw new Error('Cart already exists for this user');
        }
        const newCart = new this.cartModel(createCartDto);
        return newCart.save();
    }

    // Add Item to Cart
    async addItemToCart(
        userId: string,
        addCartItemDto: AddCartItemDto,
    ): Promise<Cart> {
        const cart = await this.cartModel.findOneAndUpdate(
            { userId: new Types.ObjectId(userId) },
            {
                $push: {
                    items: {
                        productId: new Types.ObjectId(addCartItemDto.productId),
                        quantity: addCartItemDto.quantity,
                    },
                },
            },
            { new: true, upsert: true },
        );
        return cart;
    }

    // Update Item Quantity in Cart
    async updateCartItem(
        userId: string,
        updateCartItemDto: UpdateCartItemDto,
    ): Promise<Cart> {
        const cart = await this.cartModel.findOne({
            userId: new Types.ObjectId(userId),
        });
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }
        const itemIndex = cart.items.findIndex(
            (item) =>
                item.productId.toString() === updateCartItemDto.productId.toString(),
        );
        if (itemIndex === -1) {
            throw new NotFoundException('Item not found in cart');
        }
        cart.items[itemIndex].quantity = updateCartItemDto.quantity;
        return cart.save();
    }

    // Remove Item from Cart
    async removeItemFromCart(
        userId: string,
        removeCartItemDto: RemoveCartItemDto,
    ): Promise<Cart> {
        const cart = await this.cartModel.findOneAndUpdate(
            { userId: new Types.ObjectId(userId) },
            {
                $pull: {
                    items: { productId: new Types.ObjectId(removeCartItemDto.productId) },
                },
            },
            { new: true },
        );
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }
        return cart;
    }

    // Clear Cart
    async clearCart(userId: string): Promise<Cart> {
        const cart = await this.cartModel.findOneAndUpdate(
            { userId: new Types.ObjectId(userId) },
            { $set: { items: [] } },
            { new: true },
        );
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }
        return cart;
    }

    // Extra Methods

    // Calculate Total Price
    async calculateTotalPrice(userId: string): Promise<number> {
        const cart = await this.getCartByUserId(userId);
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }
        let totalPrice = 0;
        for (const item of cart.items) {
            // Assume each product has a 'price' field
            totalPrice += item.quantity * item.productId['price'];
        }
        cart.totalPrice = totalPrice;
        await cart.save();
        return totalPrice;
    }

    // Get Cart Item Count
    async getItemCount(userId: string): Promise<number> {
        const cart = await this.getCartByUserId(userId);
        if (!cart) {
            return 0;
        }
        return cart.items.reduce((count, item) => count + item.quantity, 0);
    }
}
