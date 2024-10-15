/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    NotFoundException,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './cart.schema';
import {
    CreateCartDto,
    AddCartItemDto,
    UpdateCartItemDto,
    RemoveCartItemDto,
} from '../dtos/cart.dto';

@Controller('carts')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    // Get Cart by User ID
    @Get(':userId')
    async getCartByUserId(@Param('userId') userId: string): Promise<Cart> {
        const cart = await this.cartService.getCartByUserId(userId);
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }
        return cart;
    }

    // Create a new Cart
    @Post()
    async createCart(@Body() createCartDto: CreateCartDto): Promise<Cart> {
        return this.cartService.createCart(createCartDto);
    }

    // Add Item to Cart
    @Post(':userId/items')
    async addItemToCart(
        @Param('userId') userId: string,
        @Body() addCartItemDto: AddCartItemDto,
    ): Promise<Cart> {
        return this.cartService.addItemToCart(userId, addCartItemDto);
    }

    // Update Item Quantity in Cart
    @Put(':userId/items')
    async updateCartItem(
        @Param('userId') userId: string,
        @Body() updateCartItemDto: UpdateCartItemDto,
    ): Promise<Cart> {
        return this.cartService.updateCartItem(userId, updateCartItemDto);
    }

    // Remove Item from Cart
    @Delete(':userId/items')
    async removeItemFromCart(
        @Param('userId') userId: string,
        @Body() removeCartItemDto: RemoveCartItemDto,
    ): Promise<Cart> {
        return this.cartService.removeItemFromCart(userId, removeCartItemDto);
    }

    // Clear Cart
    @Delete(':userId')
    async clearCart(@Param('userId') userId: string): Promise<Cart> {
        return this.cartService.clearCart(userId);
    }
}
