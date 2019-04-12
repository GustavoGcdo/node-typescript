import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private readonly repository: Repository<Product>,
    ) { }

    async get(): Promise<Product[]> {
        return await this.repository.find();
    }

    async getById(id: number): Promise<Product> {
        return await this.repository.findOne({ id });
    }

    async post(product: Product) {
        return await this.repository.save(product);
    }

    async put(id: number, product: Product) {
        return await this.repository.update(id, product);
    }

    async delete(id: number) {
        return await this.repository.delete(id);
    }

}
