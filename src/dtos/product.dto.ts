/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    stock: number;

    @IsNotEmpty()
    @IsString()
    categoryId: string;

    @IsNotEmpty()
    @IsString()
    vendorId: string;
}

export class UpdateProductDto {
    @IsString()
    title?: string;

    @IsNumber()
    @Min(0)
    price?: number;

    @IsNumber()
    @Min(0)
    stock?: number;

    @IsString()
    categoryId?: string;

    @IsString()
    vendorId?: string;
}
