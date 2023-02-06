import { Controller, Post } from '@nestjs/common';
import { Body, Delete, Param } from '@nestjs/common/decorators';
import { DepositService } from '../../../business/services/deposit/deposit.service';
import { newDepositDTO } from '../../../business/dtos/new-deposit.dto';
import { DepositEntity } from 'src/data';

@Controller('deposits')
export class DepositsController {
  constructor(private readonly depositService: DepositService) {}

  @Post('newDeposit')
  createDeposit(@Body() deposit: newDepositDTO): DepositEntity {
    return this.depositService.createDeposit(deposit);
  }

  /**
   * borrar depositos
   */
  @Delete('delete/:id')
  deleteDeposit(@Param('id') id: string): void {
    this.depositService.deleteDeposit(id);
  }
}
