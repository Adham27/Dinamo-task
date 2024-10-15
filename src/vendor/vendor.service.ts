/* eslint-disable prettier/prettier */
/* vendor.service.ts */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vendor, VendorDocument } from './vendor.schema';
import { BaseService } from '../base/base.service';
import { Product } from 'src/product/product.schema';

@Injectable()
export class VendorService extends BaseService<VendorDocument> {
    constructor(@InjectModel(Vendor.name) private vendorModel: Model<VendorDocument>) {
        super(vendorModel);
    }

    // Extra Methods

    // Find vendor by email
    async findByEmail(email: string): Promise<Vendor | null> {
        return this.vendorModel.findOne({ email }).exec();
    }

    // Authenticate vendor
    async authenticate(email: string, password: string): Promise<Vendor | null> {
        const vendor = await this.findByEmail(email);
        if (vendor && vendor.password === password) {
            return vendor;
        }
        return null;
    }

    // Get vendor's products
    async getProducts(vendorId: string): Promise<Product[]> {
        const vendor = await this.vendorModel
            .findById(vendorId)
            .populate('products') // populate the products field
            .exec();

        return vendor?.products || [];
    }

}
