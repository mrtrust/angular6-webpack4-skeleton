import { NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { UIRouterModule, UIView } from '@uirouter/angular';

import 'styles/common';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { COMPONENTS } from './pages/components';
import { AppComponent } from './app.component';
import { APP_STATES } from "./app.states";
import { routerConfigFn } from './router.config';
import { TokenService } from './core/services/token.service';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { UrlManagerService } from "./core/url-manager.service";

/**
 * Root module of the app SPA
 */
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(), // forRoot ensures the providers are only created once
    UIRouterModule.forRoot({
      states: APP_STATES,
      useHash: false, //to use hash for old browsers, make it true
      otherwise: {state: 'notFound'},
      config: routerConfigFn,
    }),

    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: (tokenService, urlManagerService) => {
          return {
            tokenGetter: () => {
              return tokenService.getToken();
            },
            whitelistedDomains: [urlManagerService.baseUrl],
          };
        },
        deps: [TokenService, UrlManagerService]
      }
    }),
    CoreModule,
    SharedModule,
  ],
  declarations: [
    AppComponent, // main component for `app entry-point`
    COMPONENTS // all components for `app entry-point` that you want to load as part of the main module
  ],
  providers: [
    {provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},],
  bootstrap: [UIView]
})
export class AppModule {
}
