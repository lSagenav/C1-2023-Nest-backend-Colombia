import { Injectable } from '@nestjs/common';
import { DepositRepository, DepositEntity } from 'src/data';
import { AccountRepository } from '../../../data/persistence/repositories/account.repository';
import { newDepositDTO } from '../../dtos/new-deposit.dto';
import { AccountService } from '../account/account.service';

@Injectable()
export class DepositService {
  constructor(
    private readonly depositRepository: DepositRepository,
    private readonly accountRepository: AccountRepository,
    private readonly accountService: AccountService,
  ) {}

  /**
   * creacion
   *
   * @param deposit
   * @returns depo
   */
  mapDeposit(deposit: newDepositDTO): DepositEntity {
    const depo = new DepositEntity();
    const account = this.accountRepository.findOneById(deposit.account);
    depo.account = account;
    depo.amount = deposit.amount;
    return depo;
  }
  /**
   * Crear un deposito
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
  createDeposit(deposit: newDepositDTO): DepositEntity {
    const newDeposit = new DepositEntity();
    newDeposit.account = this.accountRepository.findOneById(deposit.account);
    newDeposit.amount = deposit.amount;
    newDeposit.dateTime = new Date();
    return this.depositRepository.register(newDeposit);
  }

  /**
   *
   */

  /**
   * Borrar un deposito
   *
   * @param {string} depositId
   * @memberof DepositService
   */
  deleteDeposit(depositId: string): void {
    const deposited = this.depositRepository.findOneById(depositId);
    if (deposited.deletedAt === undefined) {
      this.depositRepository.delete(depositId, true);
    } else {
      this.depositRepository.delete(depositId, false);
    }
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
  // getHistory(
  //   accountId: string,
  //   pagination: PaginationModel,
  //   dataRange?: DataRangeModel,
  // ): DepositEntity[] {
  //   throw new Error('This method is not implemented');
  // }
}
