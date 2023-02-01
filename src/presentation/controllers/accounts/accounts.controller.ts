import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { AccountService, NewAccountDto } from 'src/business';
import { AccountEntity } from 'src/data';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  getAccounts(): AccountEntity[] {
    return this.accountService.findAll();
  }

  @Get()
  getAccount(@Param('id', new ParseUUIDPipe()) id: string): AccountEntity {
    return this.accountService.findOneById(id);
  }

  @Put()
  modifyAccount(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() account: NewAccountDto,
  ): AccountEntity {
    return this.accountService.updateAccount(id, account);
  }

  @Delete()
  deleteAccount(@Param('id', new ParseUUIDPipe()) id: string): void {
    return this.accountService.deleteAccount(id);
  }
}
