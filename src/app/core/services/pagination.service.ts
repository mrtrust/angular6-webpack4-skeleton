import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Pagination } from '../models/pagination.model';
import { IApiResponseResolved, IApiResponseResolvedWithPagination } from '../interfaces/api-response';

/**
 * Pagination service to get pagination params
 */
@Injectable()
export class PaginationService {

  extractPagination(res: HttpResponse<IApiResponseResolved<any>>) {
    const pagination: Pagination = new Pagination();
    pagination.totalItems = +res.headers.get('X-Pagination-Total');
    pagination.page = +res.headers.get('X-Pagination-Page');
    pagination.perPage = +res.headers.get('X-Pagination-Per-Page');

    return {
      ...res.body,
      pagination
    } as IApiResponseResolvedWithPagination<any>;
  }

}
