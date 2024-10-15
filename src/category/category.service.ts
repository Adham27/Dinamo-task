/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';
import { BaseService } from '../base/base.service';

@Injectable()
export class CategoryService extends BaseService<CategoryDocument> {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    ) {
        super(categoryModel);
    }


    // Find category by title
    async findByTitle(title: string): Promise<Category | null> {
        return this.findOne({ title });
    }

    // Search categories
    async searchCategories(keyword: string): Promise<Category[]> {
        return this.search({ title: { $regex: keyword, $options: 'i' } });
    }
}
