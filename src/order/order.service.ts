/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';
import { BaseService } from '../base/base.service';

@Injectable()
export class OrderService extends BaseService<OrderDocument> {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    ) {
        super(orderModel);
    }

    // Get orders by user ID
    async getOrdersByUser(userId: string): Promise<Order[]> {
        return this.search({ userId });
    }

    // Update order status
    async updateOrderStatus(
        orderId: string,
        status: string,
    ): Promise<Order | null> {
        return this.update(orderId, { status });
    }

    // Get orders by status
    async getOrdersByStatus(status: string): Promise<Order[]> {
        return this.search({ status });
    }

    // Get order details with populated items
    async getOrderDetails(orderId: string): Promise<Order | null> {
        return this.model
            .findById(orderId)
            .populate('items.productId')
            .exec();
    }
}
