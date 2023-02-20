import { IsNumber, IsUUID } from 'class-validator';

/* This class is used to create a new account. It has a customerId, accountType, and balance */
export class NewAccountDto {
  @IsUUID()
  CustomerEntity: string;
  @IsUUID()
  accountType: string;
  @IsNumber()
  balance: number;
  customerId: string;
}
