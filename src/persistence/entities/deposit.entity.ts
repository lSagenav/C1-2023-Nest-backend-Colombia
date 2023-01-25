import { v4 as uuid } from 'uuid';
import { DepositModel } from '../../models/deposit.model';
import { AccountEntity } from './account.entity';

export class DespositEntity implements DepositModel {
  id = uuid();
  account: AccountEntity;
  amount: number;
  dateTime: number | Date;
  deletedAt?: number | Date;
}