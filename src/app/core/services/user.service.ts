import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';

import { UrlManagerService } from '../url-manager.service';
import { User } from '../models/user.model';
import { PaginationService } from './pagination.service';
import { IApiResponseResolved, IApiResponseResolvedWithPagination } from '../interfaces/api-response';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(public http: HttpClient, public urlManagerService: UrlManagerService, public paginationService: PaginationService) {
  }

  getAll(filter: HttpParams) {
    const url: string = this.urlManagerService.user.search();
    return this.http.get(url, {params: filter, observe: 'response'}).pipe(
      map(this.paginationService.extractPagination),
      map((result: IApiResponseResolvedWithPagination<Array<any>>) => {
        result.data = result.data.map((e) => new User(e));
        return result;
      }),
    );
  }

  create(user: User) {
    const url = this.urlManagerService.user.create();

    return this.http.post(url, user.toJSON()).pipe(
      map((res: IApiResponseResolved<IUser>) => new User(res.data))
    );
  }

  getUser(id: number) {
    const url: string = this.urlManagerService.user.find(id);

    return this.http.get(url).pipe(
      map((res: IApiResponseResolved<IUser>) => new User(res.data))
    );
  }

  updateUser(id: number, user: User) {
    const url: string = this.urlManagerService.user.update(id);

    return this.http.post(url, user.toJSON()).pipe(
      map((res: IApiResponseResolved<IUser>) => new User(res.data))
    );
  }
}
