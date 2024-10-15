/* eslint-disable prettier/prettier */
/* product.service.ts */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { BaseService } from '../base/base.service';

@Injectable()
export class ProductService extends BaseService<ProductDocument> {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {
        super(productModel);
    }

    // Extra Methods

    // Find products by category
    async findByCategory(categoryId: string): Promise<Product[]> {
        return this.productModel.find({ categoryId }).exec();
    }

    // Find products by vendor
    async findByVendor(vendorId: string): Promise<Product[]> {
        return this.productModel.find({ vendorId }).exec();
    }

    // Get top-selling products
    async getTopSelling(limit: number = 10): Promise<Product[]> {
        return this.productModel.find().sort({ salesCount: -1 }).limit(limit).exec();
    }

    // Search products
    async searchin(keyword: string): Promise<Product[]> {
        return this.productModel.find({ $text: { $search: keyword } }).exec();
    }

    // Update inventory
    async updateInventory(productId: string, quantity: number): Promise<Product | null> {
        return this.productModel.findByIdAndUpdate(productId, { $inc: { inventory: quantity } }, { new: true }).exec();
    }
}
