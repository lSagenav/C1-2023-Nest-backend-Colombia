import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { TransferEntity } from 'src/data/persistence/entities/transfer.entity';
import { TransferService } from 'src/business/services/transfer/transfer.service';
import { NewTransferDTO } from 'src/business/dtos/new-transfer.dto';
import { PaginationEntity } from 'src/data/persistence/entities/pagination.entity';
import { DataRangeEntity } from 'src/data/persistence/entities/data_range.entity';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}
  @Get()
  findAll() {
    return this.transferService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.transferService.findOneById(id);
  }

  @Post('create')
  createTransfer(@Body() transfer: NewTransferDTO): TransferEntity {
    return this.transferService.createTransfer(transfer);
  }
  @Post('/hOut/:id')
  getHistoryOut(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: { actualPage: number; range: number },
  ) {
    const newPagination = new PaginationEntity();
    newPagination.actualPage = data.actualPage;
    const newDataRange = new DataRangeEntity();
    newDataRange.range = data.range;
    return this.transferService.getHistoryOut(id, newPagination, newDataRange);
  }

  @Post('/hIncome/:id')
  getHistoryIncome(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: { actualPage: number; range: number },
  ) {
    const newPagination = new PaginationEntity();
    newPagination.actualPage = data.actualPage;
    const newDataRange = new DataRangeEntity();
    newDataRange.range = data.range;
    return this.transferService.getHistoryIn(id, newPagination, newDataRange);
  }
}
