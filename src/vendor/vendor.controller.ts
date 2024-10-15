/* eslint-disable prettier/prettier */
/* vendor.controller.ts */
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { Vendor } from './vendor.schema';
import { CreateVendorDto, UpdateVendorDto } from 'src/dtos/vendor.dto';

@Controller('vendors')
export class VendorController {
    constructor(private readonly vendorService: VendorService) { }

    // Create a new vendor
    @Post()
    async create(@Body() createVendorDto: CreateVendorDto): Promise<Vendor> {
        return this.vendorService.create(createVendorDto);
    }

    // Get all vendors
    @Get()
    async findAll(): Promise<Vendor[]> {
        return this.vendorService.findAll();
    }

    // Get a vendor by ID
    @Get(':id')
    async findById(@Param('id') id: string): Promise<Vendor | null> {
        return this.vendorService.findById(id);
    }

    // Update a vendor
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateVendorDto: UpdateVendorDto): Promise<Vendor | null> {
        return this.vendorService.update(id, updateVendorDto);
    }

    // Delete a vendor
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Vendor | null> {
        return this.vendorService.delete(id);
    }

    // Authenticate vendor
    @Post('authenticate')
    async authenticate(@Body() body: { email: string; password: string }): Promise<Vendor | null> {
        return this.vendorService.authenticate(body.email, body.password);
    }

    // // Get vendor's products
    // @Get(':id/products')
    // async getProducts(@Param('id') id: string): Promise<string[]> {
    //     return this.vendorService.getProducts(id);
    // }
}
