import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlManagerService } from '../url-manager.service';
import { tap } from 'rxjs/internal/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StateService } from '@uirouter/core';
import { TokenService } from './token.service';
import { Subject } from "rxjs/index";

@Injectable()
export class AuthenticationService {
  isAuthSource = new Subject<boolean>();

  constructor(public httpClient: HttpClient,
              public urlManagerService: UrlManagerService,
              public jwtHelper: JwtHelperService,
              public $state: StateService,
              public tokenService: TokenService) {
  }

  login(email: string, password: string) {
    const url: string = this.urlManagerService.auth.login();

    return this.httpClient.post<any>(url, {email, password})
      .pipe(tap(
        data => {
          // login successful if there's a jwt token in the response
          if (data.data && data.data.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.tokenService.setToken(data.data.token);
          }
        }
      ));
  }

  isAuthenticated(): boolean {
    const token = this.tokenService.getToken();
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  removeToken() {
    this.tokenService.removeToken();
  }

  logout() {
    const url: string = this.urlManagerService.auth.logout();
    return this.httpClient.get(url)
      .pipe(tap(
        () => {
          this.removeToken();
        }
      ));
  }

  forgetPassword(email: string) {
    //@TODO: change fake observable to real endpoint
    return new Observable((observer) => {

      setTimeout(() => {
        observer.next('true');
      }, 1000);
    });
  }

}
