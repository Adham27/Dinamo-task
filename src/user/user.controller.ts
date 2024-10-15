/* eslint-disable prettier/prettier */
/* user.controller.ts */
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // Create a new user
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    // Get all users
    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    // Get a user by ID
    @Get(':id')
    async findById(@Param('id') id: string): Promise<User | null> {
        return this.userService.findById(id);
    }

    // Update a user
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User | null> {
        return this.userService.update(id, updateUserDto);
    }

    // Delete a user
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<User | null> {
        return this.userService.delete(id);
    }

    // Authenticate user
    @Post('authenticate')
    async authenticate(@Body() body: { email: string; password: string }): Promise<User | null> {
        return this.userService.authenticate(body.email, body.password);
    }

    // Update user role
    @Put(':id/role')
    async updateRole(@Param('id') id: string, @Body('role') role: string): Promise<User | null> {
        return this.userService.updateRole(id, role);
    }
}
