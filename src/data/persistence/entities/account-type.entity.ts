import { v4 as uuid } from 'uuid';
import { AccountTypeModel } from '../../models/account-type.model';

export class AccountTypeEntity implements AccountTypeModel {
  id = uuid();
  name: string;
  state = true;
}
