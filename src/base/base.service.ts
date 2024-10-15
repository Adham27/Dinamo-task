/* eslint-disable prettier/prettier */
import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';

export abstract class BaseService<T extends Document> {
    constructor(protected readonly model: Model<T>) { }

    // Create Method (Writer)
    async create(createDto: any): Promise<T> {
        const createdEntity = new this.model(createDto);
        return createdEntity.save();
    }

    // Update Method (Writer)
    async update(
        id: string,
        updateDto: UpdateQuery<T> | Partial<T>,
    ): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    }

    // Delete Method (Writer)
    async delete(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

    // Get Method (Reader)
    async findById(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    // Get All Method (Reader)
    async findAll(): Promise<T[]> {
        return this.model.find().exec();
    }

    // Search Method (Reader)
    async search(query: FilterQuery<T>): Promise<T[]> {
        return this.model.find(query).exec();
    }

    // Find One Method (Reader)
    async findOne(query: FilterQuery<T>): Promise<T | null> {
        return this.model.findOne(query).exec();
    }
}
