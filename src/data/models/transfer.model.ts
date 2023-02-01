/**
 * Modelo para manejar le información de transferencias de dinero entre cuentas
 * del mismo banco
 *
 * @export
 * @interface TransferModel
 */
import { AccountModel } from './account.model';

export interface TransferModel {
  id: string;
  outCome: AccountModel;
  inCome: AccountModel;
  amount: string;
  reason: string;
  dateTime: Date | number;
  deletedAt?: Date | number;
}
