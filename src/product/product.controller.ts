/* eslint-disable prettier/prettier */
/* product.controller.ts */
import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/product.dto';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    // Create a new product
    @Post()
    async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productService.create(createProductDto);
    }

    // Get all products
    @Get()
    async findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    // Get a product by ID
    @Get(':id')
    async findById(@Param('id') id: string): Promise<Product | null> {
        return this.productService.findById(id);
    }

    // Update a product
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product | null> {
        return this.productService.update(id, updateProductDto);
    }

    // Delete a product
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Product | null> {
        return this.productService.delete(id);
    }

    // Get products by category
    @Get('category/:categoryId')
    async findByCategory(@Param('categoryId') categoryId: string): Promise<Product[]> {
        return this.productService.findByCategory(categoryId);
    }

    // Get products by vendor
    @Get('vendor/:vendorId')
    async findByVendor(@Param('vendorId') vendorId: string): Promise<Product[]> {
        return this.productService.findByVendor(vendorId);
    }

    // Get top-selling products
    @Get('top-selling')
    async getTopSelling(@Query('limit') limit: string): Promise<Product[]> {
        const limitNumber = parseInt(limit) || 10;
        return this.productService.getTopSelling(limitNumber);
    }

    // Search products
    @Get('search')
    async search(@Query('q') keyword: string): Promise<Product[]> {
        return this.productService.searchin(keyword);
    }

    // Update inventory
    @Put(':id/inventory')
    async updateInventory(@Param('id') id: string, @Body('quantity') quantity: number): Promise<Product | null> {
        return this.productService.updateInventory(id, quantity);
    }
}
