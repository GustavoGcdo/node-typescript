import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/modules/store/entities/order.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly repository: Repository<Order>,
    ) { }

    async getByNumber(numberOrder: string): Promise<Order> {
        return await this.repository.findOne({ number: numberOrder });
    }

    async getByCustomer(customer: string): Promise<Order[]> {
        return await this.repository.find({ customer });
    }

    async post(order: Order) {
        await this.repository.save(order);
    }
}
