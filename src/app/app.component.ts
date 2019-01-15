/**
 * Initial component with its template displayed as initial page for `app entry-point`.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

import { environment } from 'environments/environment';
import { AuthenticationService } from "./core/services/authentication.service";
import { Subscription } from "rxjs/index";

export const ROOT_SELECTOR = 'app';
/**
 * Main component for Public site
 */
@Component({
  selector: ROOT_SELECTOR,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.styl'],
})

export class AppComponent implements OnInit {
  isAuth: boolean = false;

  constructor(public authService: AuthenticationService) {
  }

  ngOnInit() {
    this.isAuth = this.authService.isAuthenticated();
  }

}
