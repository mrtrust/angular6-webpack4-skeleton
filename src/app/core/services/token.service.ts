import { Injectable } from '@angular/core';
import { StateService } from '@uirouter/core';
import { User } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TransitionService } from '@uirouter/core';
import { IPayload } from "../interfaces/payload.interface";

/**
 * Token Service
 */
@Injectable()
export class TokenService {
  currentUser: User;

  constructor(public $state: StateService,
              public transition: TransitionService,
              //public jwtHelperService: JwtHelperService
  ) {
  }

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  setToken(token: string) {
      localStorage.setItem('access_token', token);

  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  setCurrentUser(usser: User) {
    this.currentUser = usser;
  }

  getRoleId(): number {
    const payload = this.getPayload();
    return payload.iss.roleId;
  }

  getPayload(): IPayload {
    const helper = new JwtHelperService();
    const token: string = this.getToken();
    return helper.decodeToken(token);
  }

  getOwnUserId(): number {
    return this.getPayload().iss.userId;
  }

  removeToken() {
      localStorage.removeItem('access_token');
  }
}
