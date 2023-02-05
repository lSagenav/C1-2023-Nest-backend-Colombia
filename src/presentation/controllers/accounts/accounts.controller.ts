import { Body, Controller, Post, Get, ParseUUIDPipe } from '@nestjs/common';
import { Delete, Param, Put } from '@nestjs/common/decorators';
import { NewAccountDto } from 'src/business';
import { AccountEntity, AccountTypeEntity } from 'src/data';
import { AccountService } from '../../../business/services/account/account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountServices: AccountService) {}

  @Post('newAccount')
  createAccount(@Body() accountId: NewAccountDto): AccountEntity {
    return this.accountServices.createAccount(accountId);
  }

  // Obtener el balance de una cuenta

  @Get('balance/:accountId')
  getBalance(@Param('accountId', ParseUUIDPipe) accountId: string): number {
    return this.accountServices.getBalance(accountId);
  }
  // obtener cuenta por id
  @Get('getAccount/:customerId')
  getAccount(
    @Param('customerId', ParseUUIDPipe) customerId: string,
  ): AccountEntity[] {
    return this.accountServices.getAccountId(customerId);
  }

  // Agregar balance a una cuenta

  @Put('putBalance/:accountId')
  putBalance(
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Body('amount') amount: number,
  ): void {
    this.accountServices.putBalance(accountId, amount);
  }

  // Remover balance de una cuenta

  @Put('remove/:accountId') removeBalance(
    @Param('accountId') accountId: string,
    @Body() body: { amount: number },
  ): void {
    return this.accountServices.removeBalance(accountId, body.amount);
  }
  // Verificar balance de una cuenta
  @Get('verify/:accountId')
  verifyBalance(
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Body() body: { amount: number },
  ): boolean {
    return this.accountServices.verifyBalance(accountId, body.amount);
  }

  // Obtener estado de la cuenta
  @Get('state/:accountId')
  gettStatus(@Param('accountId', ParseUUIDPipe) accountId: string): boolean {
    return this.accountServices.gettStatus(accountId);
  }

  // Cambiar el estado de una cuenta

  @Put('state/:accountId')
  changetState(
    @Param('accountId', ParseUUIDPipe) accountId: string,
    @Body() body: { state: boolean },
  ): void {
    this.accountServices.changetState(accountId, body.state);
  }

  //Obtener el tipo de cuenta
  @Get('type/:accountId')
  getAccountType(@Param('accountId') accountId: string): AccountTypeEntity {
    return this.accountServices.getAccount(accountId);
  }

  //Cambiar el tipo de cuenta a una cuenta
  @Put('type/:accountId')
  changeAccount(
    @Param('accountId') accountId: string,
    @Body() body: { accountTypeId: string },
  ): AccountTypeEntity {
    return this.accountServices.changeAccount(accountId, body.accountTypeId);
  }

  //Borrar una cuenta
  @Delete('delete/:accountId')
  deleteAccount(@Param('accountId') accountId: string): void {
    this.accountServices.deleteAccount(accountId);
  }
}
