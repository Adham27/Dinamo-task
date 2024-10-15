/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Put,
    Param,
    Body,
    NotFoundException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.schema';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    // Create a new order
    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        return this.orderService.create(createOrderDto);
    }

    // Get all orders
    @Get()
    async getAllOrders(): Promise<Order[]> {
        return this.orderService.findAll();
    }

    // Get order by ID
    @Get(':id')
    async getOrderById(@Param('id') id: string): Promise<Order> {
        const order = await this.orderService.getOrderDetails(id);
        if (!order) {
            throw new NotFoundException('Order not found');
        }
        return order;
    }

    // Get orders by user ID
    @Get('user/:userId')
    async getOrdersByUser(@Param('userId') userId: string): Promise<Order[]> {
        return this.orderService.getOrdersByUser(userId);
    }

    // Update order
    @Put(':id')
    async updateOrder(
        @Param('id') id: string,
        @Body() updateOrderDto: UpdateOrderDto,
    ): Promise<Order> {
        const updatedOrder = await this.orderService.update(id, updateOrderDto);
        if (!updatedOrder) {
            throw new NotFoundException('Order not found');
        }
        return updatedOrder;
    }

    // Update order status
    @Put(':id/status')
    async updateOrderStatus(
        @Param('id') id: string,
        @Body('status') status: string,
    ): Promise<Order> {
        const updatedOrder = await this.orderService.updateOrderStatus(id, status);
        if (!updatedOrder) {
            throw new NotFoundException('Order not found');
        }
        return updatedOrder;
    }

    // Get orders by status
    @Get('status/:status')
    async getOrdersByStatus(
        @Param('status') status: string,
    ): Promise<Order[]> {
        return this.orderService.getOrdersByStatus(status);
    }
}
