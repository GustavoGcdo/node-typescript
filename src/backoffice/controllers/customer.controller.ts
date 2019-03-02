import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body
} from '@nestjs/common';
import { Customer } from '../models/customer.model';

@Controller(`v1/customers`)
export class CustomerController {
  @Get()
  get() {
    return 'Obter clientes';
  }
  @Get(':document')
  getById(@Param('document') document: string) {
    return 'Obter o cliente' + document;
  }

  @Post()
  post(@Body() body: Customer) {
    return 'Criar cliente';
  }

  @Put(':document')
  put(@Param('document') document, @Body() body) {
    return { customer: document, data: body };
  }

  @Delete(':document')
  delete(@Param('document') document) {
    return 'Remover cliente';
  }
}
