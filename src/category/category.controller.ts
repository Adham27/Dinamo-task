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
    Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.schema';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    // Create a new category
    @Post()
    async createCategory(
        @Body() createCategoryDto: CreateCategoryDto,
    ): Promise<Category> {
        return this.categoryService.create(createCategoryDto);
    }

    // Get all categories
    @Get()
    async getAllCategories(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    // Get category by ID
    @Get(':id')
    async getCategoryById(@Param('id') id: string): Promise<Category> {
        const category = await this.categoryService.findById(id);
        if (!category) {
            throw new NotFoundException('Category not found');
        }
        return category;
    }

    // Update category
    @Put(':id')
    async updateCategory(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ): Promise<Category> {
        const updatedCategory = await this.categoryService.update(
            id,
            updateCategoryDto,
        );
        if (!updatedCategory) {
            throw new NotFoundException('Category not found');
        }
        return updatedCategory;
    }

    // Delete category
    @Delete(':id')
    async deleteCategory(@Param('id') id: string): Promise<Category> {
        const deletedCategory = await this.categoryService.delete(id);
        if (!deletedCategory) {
            throw new NotFoundException('Category not found');
        }
        return deletedCategory;
    }

    // Search categories
    @Get('search')
    async searchCategories(@Query('keyword') keyword: string): Promise<Category[]> {
        return this.categoryService.searchCategories(keyword);
    }
}
