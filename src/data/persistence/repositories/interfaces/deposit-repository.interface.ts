import { IRepositoryBase } from './base';
import { DepositEntity } from '../../entities';

// export interface IDepositRepository extends IRepositoryBase<DepositEntity> {
//   findByAccountId(accountId: string): Array<DepositEntity>;
//   findByDataRange(
//     dateInit: Date | number,
//     dateEnd: Date | number,
//   ): Array<DepositEntity>;
// }
export interface IDepositRepository extends IRepositoryBase<DepositEntity> {
  findByAccountId(accountId: string): DepositEntity[];
  findByDataRange(
    id: string,
    dateInit: Date | number,
    dateEnd: Date | number,
  ): DepositEntity[];
}
