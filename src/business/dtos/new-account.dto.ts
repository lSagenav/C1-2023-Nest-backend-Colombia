import { IsNumber, IsUUID } from 'class-validator';

export class NewAccountDto {
  @IsUUID()
  CustomerEntity: string;
  @IsUUID()
  accontType: string;
  @IsNumber()
  balance: number;
}
