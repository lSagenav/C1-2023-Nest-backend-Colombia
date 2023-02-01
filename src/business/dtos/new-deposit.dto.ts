import { IsNumber, IsUUID } from 'class-validator';

export class newDepositDTO {
  @IsUUID()
  account: string;
  @IsNumber()
  amount = 0;
}
