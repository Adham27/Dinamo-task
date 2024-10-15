/* eslint-disable prettier/prettier */
/* user.service.ts */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { BaseService } from '../base/base.service';

@Injectable()
export class UserService extends BaseService<UserDocument> {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
        super(userModel);
    }

    // Extra Methods

    // Find user by email
    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    // Authenticate user
    async authenticate(email: string, password: string): Promise<User | null> {
        const user = await this.findByEmail(email);
        if (user && user.password === password) { // Use hashed passwords in production
            return user;
        }
        return null;
    }

    // Update user role
    async updateRole(id: string, role: string): Promise<User | null> {
        return this.userModel.findByIdAndUpdate(id, { role }, { new: true }).exec();
    }
}
