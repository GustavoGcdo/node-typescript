import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { Result } from 'src/modules/backoffice/models/result.model';
import { Order } from 'src/modules/store/entities/order.entity';
import { OrderService } from 'src/modules/store/services/order.service';
import { OrderItem } from '../entities/order-item.entity';
import { OrderItemService } from '../services/order-item.service';
import { ProductService } from '../services/product.service';
import { OrderItemDto } from '../dtos/order-item.dto';

@Controller('v1/orders')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
        private readonly orderItemService: OrderItemService,
        private readonly productService: ProductService,
    ) { }

    @Get(':order')
    async get(@Param('order') order: string) {
        try {
            const orders = await this.orderService.getByNumber(order);
            return new Result(null, true, orders, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível listar os pedidos', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':customer')
    async getByCustomer(@Param('customer') customer: string) {
        try {
            const orders = await this.orderService.getByCustomer(customer);
            return new Result(null, true, orders, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível listar os pedidos', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async post(@Body() model: OrderItemDto[]) {
        try {
            const order = new Order();
            order.customer = '12345678911'; // Vem do Token
            order.date = new Date();
            order.number = '1B2D3F5';
            order.items = [];
            await this.orderService.post(order);

            for (const item of model) {
                const product = await this.productService.getById(item.product);
                const orderItem = new OrderItem();
                orderItem.order = order;
                orderItem.product = product;
                orderItem.price = product.price;
                orderItem.quantity = item.quantity;
                await this.orderItemService.post(orderItem);
            }

            return new Result(null, true, model, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível criar seu pedido', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}
