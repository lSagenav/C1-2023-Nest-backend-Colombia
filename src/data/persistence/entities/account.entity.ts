/**
 * Entidad para el manejo de la cuenta bancaria del cliente
 *
 * @export
 * @class AccountEntity
 * @implements {AccountModel}
 */
import { v4 as uuid } from 'uuid';
import { AccountModel } from '../../models/account.model';
import { AccountTypeModel } from '../../models/account-type.model';
import { CustomerModel } from 'src/data/models';

export class AccountEntity implements AccountModel {
  id = uuid();
  customer: CustomerModel;
  accountType: AccountTypeModel;
  balance: number;
  state = true;
  deletedAt?: number | Date;
  customerId: string;
}
