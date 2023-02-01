import { Body, Controller, Post, Get, ParseUUIDPipe } from '@nestjs/common';
import { Delete, Param, Put } from '@nestjs/common/decorators';
import { NewAccountDto } from 'src/business';
import { AccountEntity } from 'src/data';
import { AccountServices } from '../../../business/services/account/account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountServices: AccountServices) {}

  @Post('newUser')
  createAccount(@Body() accountId: NewAccountDto): AccountEntity {
    return this.accountServices.createAccount(accountId);
  }

  // Obtener el balance de una cuenta

  @Get('balance/: accountId')
  getBalance(@Param('accountId', ParseUUIDPipe) accountId: string): number {
    return this.accountServices.getBalance(accountId);
  }

  // Agregar balance a una cuenta

  @Put('putBalance/: accountId')
  putBalance(
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Param('amount') amount: number,
  ): void {
    this.accountServices.putBalance(accountId, amount);
  }

  // Remover balance de una cuenta

  @Put('remuve/: accounrId')
  removeBalance(
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Param('amount') amount: number,
  ): void {
    this.accountServices.removeBalance(accountId, amount);
  }
}
