import { Injectable } from '@angular/core';
import { StateService } from '@uirouter/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public auth: AuthenticationService, public $state: StateService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
        },
        (err: any) => {

          if (err instanceof HttpErrorResponse) {

            if (err.status === 401 || err.status === 403) {
              this.auth.removeToken();
              this.$state.go('app.login', null, {reload: true});
            }
          }
        })
    );
  }
}