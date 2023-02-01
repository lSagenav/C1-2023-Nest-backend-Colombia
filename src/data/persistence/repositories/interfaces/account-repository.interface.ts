import { IRepositoryBase } from './base';
import { AccountEntity } from '../../entities';

export interface IAccountRepository extends IRepositoryBase<AccountEntity> {
  findByState(state: boolean): Array<AccountEntity>;
  findByCustomer(customerId: string): Array<AccountEntity>;
  findByAccountType(accountTypeId: string): Array<AccountEntity>;
}
