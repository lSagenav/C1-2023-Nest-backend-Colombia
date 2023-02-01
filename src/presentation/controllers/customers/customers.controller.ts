import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CustomerService, NewCustomerDTO } from 'src/business';
import { CustomerEntity } from 'src/data';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomerService) {}
  @Get()
  findAllUsers(): CustomerEntity[] {
    return this.customerService.findAll();
  }

  @Post()
  registerUser(@Body() customer: NewCustomerDTO): CustomerEntity {
    return this.customerService.newCustomer(customer);
  }
  @Post()
  getCustomerInf(
    @Param('id', ParseUUIDPipe) customerId: string,
  ): CustomerEntity {
    return this.customerService.getCustomerInfo(customerId);
  }

  @Post()
  unsubscribe(@Param('id', ParseUUIDPipe) customerId: string): boolean {
    return this.customerService.unsubscribe(customerId);
  }
}
