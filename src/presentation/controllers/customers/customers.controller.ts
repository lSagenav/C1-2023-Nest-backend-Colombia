import { CustomerService } from './../../../business/services/customer/customer.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { NewCustomerDTO } from 'src/business';
import { CustomerEntity } from 'src/data';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomerService) {}
  @Get() //trae todos los usuarios
  findAllUsers(): CustomerEntity[] {
    return this.customerService.findAll();
  }

  @Post() //registrar usuario
  registerUser(@Body() customer: NewCustomerDTO): CustomerEntity {
    return this.customerService.newCustomer(customer);
  }

  // actualizar usuario
  @Patch(':id')
  updatecustomer(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() customer: NewCustomerDTO,
  ): CustomerEntity {
    return this.customerService.updatedCustomer(id, customer);
  }

  // Obtener información de un cliente
  @Get(':id')
  getCustomerInfo(
    @Param('id', ParseUUIDPipe) customerId: string,
  ): CustomerEntity {
    return this.customerService.getCustomerInfo(customerId);
  }

  @Put(':id') //se desactiva la cuenta
  unsubscribe(@Param('id', ParseUUIDPipe) customerId: string): boolean {
    return this.customerService.unsubscribe(customerId);
  }
}
