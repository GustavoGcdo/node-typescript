import { Body, Controller, HttpException, HttpStatus, Param, Post, UseInterceptors, Get } from '@nestjs/common';
import { CreateAddressContract } from '../contracts/address/create-address.contract';
import { AddressType } from '../enums/address-type.enum';
import { ValidatorInterceptor } from '../interceptors/validator.interceptor';
import { Address } from '../models/address.model';
import { Result } from '../models/result.model';
import { AddressService } from '../services/address.service';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('v1/addresses')
export class AddressController {

    constructor(
        private readonly service: AddressService,
    ) { }

    @Post(':document/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addBillingAddress(@Param('document') document, @Body() model: Address) {
        try {
            const res = await this.service.create(document, model, AddressType.Billing);
            return new Result('Endereco atualizado com sucesso', true, model, null);
        } catch (error) {
            throw new HttpException(new Result('Nao foi possivel realizar seu cadastro', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShippingAddress(@Param('document') document, @Body() model: Address) {
        try {
            const res = await this.service.create(document, model, AddressType.Shipping);
            return new Result('Endereco atualizado com sucesso', true, model, null);
        } catch (error) {
            throw new HttpException(new Result('Nao foi possivel realizar seu cadastro', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get('search/:zipcode')
    async search(@Param('zipcode') zipcode) {
        try {
            const response = await this.service.getAddressByZipCode(zipcode).toPromise();
            return new Result(null, true, response.data, null);
        } catch (error) {
            throw new HttpException(new Result('Nao foi possivel localizar seu endereço', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

}
