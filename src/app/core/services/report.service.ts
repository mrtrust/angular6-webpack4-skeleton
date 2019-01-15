import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//import { Observable } from "rxjs";
import { map } from 'rxjs/internal/operators';

import { UrlManagerService } from '../url-manager.service';
import { PaginationService } from './pagination.service';

import { IApiResponseResolved } from '../interfaces/api-response';
import { IReport } from "../interfaces/report.interface";
import { Report } from "../models/report.model";

@Injectable()
export class ReportService {
  constructor(public http: HttpClient, public urlManagerService: UrlManagerService, public paginationService: PaginationService) {
  }

  getAll(filter: HttpParams) {
    const url: string = this.urlManagerService.report.search();
    return this.http.get(url, {params: filter, observe: 'response'}).pipe(
      map(this.paginationService.extractPagination),
      map((result) => {
        result.data = result.data.map((e) => new Report(e));
        return result;
      }),
    );
  }

  getReport(id: number) {
    const filter: HttpParams = new HttpParams();
    const url: string = this.urlManagerService.report.find(id);
    return this.http.get(url, {params: filter}).pipe(
      map((data: IApiResponseResolved<IReport>) => data.data),
      map((result) => new Report(result)),
    );
  }

  delete(id: number) {
    const url: string = this.urlManagerService.report.delete(id);
    return this.http.delete(url);
  }
}
