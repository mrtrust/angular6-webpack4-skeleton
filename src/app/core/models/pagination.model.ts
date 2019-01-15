import { IPagination } from '../interfaces/pagination.interface';

export class Pagination implements IPagination {
  page: number;
  totalItems: number;
  perPage: number;
  lastItem: number;
}
