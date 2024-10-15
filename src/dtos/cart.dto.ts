/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCartDto {
    @IsNotEmpty()
    @IsString()
    userId: string;
}

export class AddCartItemDto {
    @IsNotEmpty()
    @IsString()
    productId: string;

    @IsNumber()
    quantity: number;
}

export class UpdateCartItemDto {
    @IsNotEmpty()
    @IsString()
    productId: string;

    @IsNumber()
    quantity: number;
}

export class RemoveCartItemDto {
    @IsNotEmpty()
    @IsString()
    productId: string;
}
