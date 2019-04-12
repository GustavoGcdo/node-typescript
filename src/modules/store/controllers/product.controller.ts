import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Result } from 'src/modules/backoffice/models/result.model';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';

@Controller('v1/products')
export class ProductController {
    constructor(private readonly service: ProductService) { }

    @Get()
    async get() {
        try {
            const products = await this.service.get();
            return new Result(null, true, products, null);
        } catch (error) {
            throw new HttpException(new Result('Nao foi possivel listar os produtos', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async post(@Body() model: Product) {
        try {
            await this.service.post(model);
            return new Result(null, true, model, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possível incluir o produto', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async put(@Param('id') id, @Body() model: Product) {
        try {
            await this.service.put(id, model);
            return new Result(null, true, model, null);
        } catch (error) {
            throw new HttpException(new Result('Nao foi possivel alterar o produto', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id) {
        try {
            await this.service.delete(id);
            return new Result('Produto removido com sucesso', true, null, null);
        } catch (error) {
            throw new HttpException(new Result('Nao foi possivel remover o produto', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}
