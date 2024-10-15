/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateVendorDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    owner: string; // User ID
}

export class UpdateVendorDto {
    @IsString()
    name?: string;

    @IsEmail()
    email?: string;

    @IsString()
    password?: string;

    @IsString()
    address?: string;
}
