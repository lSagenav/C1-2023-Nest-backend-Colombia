import { PaginationModel } from '../../models/pagination.model';
export class PaginationEntity implements PaginationModel {
  dimension: number;
  page: number;
  size: number;
  numberPages: number;
  actualPage: number;
}
