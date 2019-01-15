import { IPagination } from './pagination.interface';

export interface IApiResponse {
  success: 'true' | 'false';
}

export interface IApiResponseResolved<T> extends IApiResponse {
  data: T;
}

export interface IApiResponseResolvedWithPagination<T> extends IApiResponseResolved<T> {
  pagination: IPagination;
}

export interface IApiResponseRejected extends IApiResponse {
  message: string;
  details?: Array<string>;
}
