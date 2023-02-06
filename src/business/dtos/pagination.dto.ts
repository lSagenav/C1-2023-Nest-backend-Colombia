import { IsNumberString } from 'class-validator';

export class PaginationDTO {
  @IsNumberString()
  length: number;

  @IsNumberString()
  page: number;
}
