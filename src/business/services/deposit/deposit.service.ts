import { Injectable } from '@nestjs/common';
import { DepositRepository, DepositModel, DepositEntity } from 'src/data';

@Injectable()
export class DepositService {
  constructor(private readonly depositRepository: DepositRepository) {}

  /**
   * Crear un deposito
   *
   * @param {DepositModel} deposit
   * @return {*}  {DepositEntity}
   * @memberof DepositService
   */
  createDeposit(deposit: DepositModel): DepositEntity {
    const newDeposit = new DepositEntity();
    newDeposit.account = deposit.account;
    newDeposit.amount = deposit.amount;
    newDeposit.dateTime = new Date();
    return this.depositRepository.register(newDeposit);
  }

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
