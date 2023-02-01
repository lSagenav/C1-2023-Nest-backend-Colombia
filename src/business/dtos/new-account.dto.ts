import { IsNumber, IsUUID } from 'class-validator';

export class NewAccountDto {
  @IsUUID()
  CustomerEntity: string;
  @IsUUID()
  accountType: string;
  @IsNumber()
  balance: number;
}
