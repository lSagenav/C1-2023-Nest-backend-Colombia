import { Injectable, NotFoundException } from '@nestjs/common';
import { DepositRepository, AccountRepository, DepositEntity } from 'src/data';
import { DataRangeModel } from 'src/data/models/data-range.model';
import { PaginationModel } from 'src/data/models/pagination.model';
import { AccountService } from '../account';
import { newDepositDTO } from '../../dtos/new-deposit.dto';

@Injectable()
export class DepositService {
  constructor(
    private readonly depositRepository: DepositRepository,
    private readonly accountService: AccountService,
    private readonly accountRepository: AccountRepository,
  ) {}
  /**
   * Crear un deposito
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
  createDeposit(deposit: newDepositDTO): DepositEntity {
    const newDeposit = new DepositEntity();
    const newAccount = this.accountRepository.findOneById(deposit.account);
    if (this.accountService.gettStatus(deposit.account)) {
      newDeposit.amount = deposit.amount;
      newDeposit.dateTime = Date.now();
      newAccount.id = deposit.account;
      newDeposit.account = newAccount;
      this.accountService.putBalance(deposit.account, deposit.amount);
      return this.depositRepository.register(newDeposit);
    } else {
      throw new NotFoundException('La cuenta no se encuentra activa');
    }
  }
  /**
   * Borrar un deposito
   *
   * @param {string} depositId
   * @memberof DepositService
   */
  deleteDeposit(depositId: string): void {
    const deposit = this.depositRepository.findOneById(depositId);
    if (deposit.deletedAt === undefined) {
      this.depositRepository.delete(depositId, true);
    } else {
      this.depositRepository.delete(depositId, false);
    }
  }
  allDeposit(): DepositEntity[] {
    return this.depositRepository.findAll();
  }

  /**
   * Obtener el historial de los depósitos en una cuenta
   *
   * @param {string} accountId
   * @param {PaginationModel} pagination
   * @param {DataRangeModel} [dataRange]
   * @return {*}  {DepositEntity[]}
   * @memberof DepositService
   */
  getHistory(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): DepositEntity[] {
    const arrayTransfer = this.depositRepository.findByDataRange(
      accountId,
      0,
      Date.now(),
    );
    console.log('ARRAY', arrayTransfer);
    const arrayTransferReturn: DepositEntity[] = [];
    return arrayTransfer;
  }
}
