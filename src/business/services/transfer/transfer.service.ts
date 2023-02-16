import { Injectable, NotFoundException } from '@nestjs/common';
import { NewTransferDTO } from 'src/business/dtos';
import { AccountRepository, TransferModel, TransferRepository } from 'src/data';
import { DataRangeModel } from 'src/data/models/data-range.model';
import { PaginationModel } from 'src/data/models/pagination.model';
import { TransferEntity } from 'src/data/persistence/entities';
import { AccountService } from '../account';

@Injectable()
export class TransferService {
  constructor(
    private readonly transferRepository: TransferRepository,
    private readonly accountService: AccountService,
    private readonly accountRepository: AccountRepository,
  ) {}

  findAll(): TransferEntity[] {
    return this.transferRepository.findAll();
  }
  findOneById(id: string): TransferEntity {
    const findTransfer = this.transferRepository.findOneById(id);
    if (findTransfer) {
      return findTransfer;
    } else {
      throw new NotFoundException('No existe la Transferencia con ese ID');
    }
  }
  /**
   * Crear una transferencia entre cuentas del banco
   *
   * @param {TransferModel} transfer
   * @return {*}  {TransferEntity}
   * @memberof TransferService
   */
  createTransfer(transfer: NewTransferDTO): TransferModel {
    const newMovement = new TransferEntity();
    const newIncome = this.accountRepository.findOneById(transfer.income);
    const newOutcome = this.accountRepository.findOneById(transfer.outcome);
    if (newIncome.balance > Number(transfer.amount)) {
      newMovement.inCome = newIncome;
      newMovement.outCome = newOutcome;
      newMovement.amount = String(transfer.amount);
      newMovement.reason = transfer.reason;
      newOutcome.balance -= Number(transfer.amount);
      this.accountRepository.update(newOutcome.id, newOutcome);
      newIncome.balance += Number(transfer.amount);
      this.accountRepository.update(newIncome.id, newIncome);
      newMovement.dateTime = Date.now();
      return this.transferRepository.register(newMovement);
    } else {
      throw new NotFoundException(
        'Transaccion Rechazada, por fondos insufientes',
      );
    }
  }
  getHistoryOut(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    const arrayTransfer = this.transferRepository.findByOutcomeId(accountId);
    const arrayTransferReturn: TransferEntity[] = [];
    let range = 0;
    pagination.size = arrayTransfer.length;
    if (dataRange?.range === undefined) {
      range = 10;
    } else {
      range = dataRange.range;
    }
    pagination.numberPages = Math.round(pagination.size / range);
    for (
      let x = 1 + range * (pagination.actualPage - 1);
      x < 1 + range + range * (pagination.actualPage - 1);
      x++
    ) {
      arrayTransferReturn.push(arrayTransfer[x - 1]);
    }
    return arrayTransferReturn;
  }

  /**
   * Obtener historial de transacciones de entrada en una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistoryIn(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    const arrayTransfer = this.transferRepository.findByIncomeId(accountId);
    const arrayTransferReturn: TransferEntity[] = [];
    let range = 0;
    pagination.size = arrayTransfer.length;
    if (dataRange?.range === undefined) {
      range = 10;
    } else {
      range = dataRange.range;
    }
    pagination.numberPages = Math.round(pagination.size / range);
    for (
      let x = 1 + range * (pagination.actualPage - 1);
      x < 1 + range + range * (pagination.actualPage - 1);
      x++
    ) {
      arrayTransferReturn.push(arrayTransfer[x - 1]);
    }
    return arrayTransferReturn;
  }

  /**
   * Obtener historial de transacciones de una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {TransferEntity[]}
   * @memberof TransferService
   */
  getHistory(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    const arrayTransfer = this.transferRepository.findByDateRange(
      accountId,
      0,
      Date.now(),
    );
    const arrayTransferReturn: TransferEntity[] = [];
    let range = 0;
    pagination.size = arrayTransfer.length;
    if (dataRange?.range === undefined) {
      range = 10;
    } else {
      range = dataRange.range;
    }
    pagination.numberPages = Math.round(pagination.size / range);
    for (
      let x = 1 + range * (pagination.actualPage - 1);
      x < 1 + range + range * (pagination.actualPage - 1);
      x++
    ) {
      arrayTransferReturn.push(arrayTransfer[x - 1]);
    }
    return arrayTransferReturn;
  }

  /**
   * Borrar una transacción
   *
   * @param {string} transferId
   * @memberof TransferService
   */
  deleteTransfer(transferId: string): void {
    const transfer = this.transferRepository.findOneById(transferId);
    if (transfer.deletedAt === undefined) {
      this.transferRepository.delete(transferId, true);
    } else {
      this.transferRepository.delete(transferId, false);
    }
  }
}
