import { IsUUID, IsNumber } from 'class-validator';

export class newDepositDTO {
  @IsUUID()
  account: string;
  @IsNumber()
  amount: number;
}
