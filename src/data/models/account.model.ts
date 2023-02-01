/**
 * Modelo de las cuentas bancarias
 *
 * @export
 * @interface AccountModel
 */
import { AccountTypeModel } from './account-type.model';
import { CustomerModel } from './customer.model';

export interface AccountModel {
  id: string;
  customer: CustomerModel;
  accountType: AccountTypeModel;
  balance: number;
  state: boolean;
  deletedAt?: Date | number;
}
