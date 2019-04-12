import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderService } from './services/order.service';
import { OrderItemService } from './services/order-item.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product,
            Order,
            OrderItem,
        ])],
    controllers: [ProductController],
    providers: [ProductService, OrderService, OrderItemService],
})
export class StoreModule { }
