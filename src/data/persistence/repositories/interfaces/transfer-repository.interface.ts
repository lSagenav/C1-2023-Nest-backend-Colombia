import { IRepositoryBase } from './base';
import { TransferEntity } from '../../entities';

export interface ITransferRepository extends IRepositoryBase<TransferEntity> {
  findOutcomeByDataRange(
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
  ): Array<TransferEntity>;
  findIncomeByDataRange(
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
  ): Array<TransferEntity>;
}
