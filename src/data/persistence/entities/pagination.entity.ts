import { PaginationModel } from '../../models/pagination.model';

export class PaginationEntity implements PaginationModel {
  size?: number | undefined;
  numberPages?: number | undefined;
  actualPage: number;
}
