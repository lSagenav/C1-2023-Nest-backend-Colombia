import { IsDateString, IsNumberString } from 'class-validator';

export class DataRangeDTO {
  @IsDateString()
  startDate?: number | Date;

  @IsDateString()
  endDate?: number | Date;

  @IsNumberString()
  startAmount?: number;

  @IsNumberString()
  endAmount?: number;
}
