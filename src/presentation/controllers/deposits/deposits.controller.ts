import { Controller, ParseUUIDPipe, Post } from '@nestjs/common';
import { Body, Delete, Get, Param } from '@nestjs/common/decorators';
import { DepositService } from '../../../business/services/deposit/deposit.service';
import { newDepositDTO } from '../../../business/dtos/new-deposit.dto';
import { DepositEntity } from 'src/data';
import { PaginationEntity } from 'src/data/persistence/entities/pagination.entity';

@Controller('deposits')
export class DepositsController {
  constructor(private readonly depositService: DepositService) {}

  @Get('findall')
  findall(): DepositEntity[] {
    return this.depositService.allDeposit();
  }

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

  /**
   *
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {DepositEntity[]}
   * @memberof DepositController
   */
  @Post('gethistory/:id')
  getHistory(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: { actualPage: number; range: number },
  ): DepositEntity[] {
    const newPagination = new PaginationEntity();
    newPagination.actualPage = data.actualPage;
    newPagination.numberPages = data.range;
    return this.depositService.getHistory(id, newPagination);
  }
}
