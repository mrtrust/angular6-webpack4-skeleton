import { LoginComponent } from "./login.component";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UIRouterModule } from "@uirouter/angular";
import { APP_STATES } from "../../app.states";
import { routerConfigFn } from "../../router.config";
import { JWT_OPTIONS, JwtModule } from "@auth0/angular-jwt";
import { TokenService } from "../../core/services/token.service";
import { UrlManagerService } from "../../core/url-manager.service";
import { CoreModule } from "../../core/core.module";
import { SharedModule } from "../../shared/shared.module";
import { AppComponent } from "../../app.component";
import { COMPONENTS } from "../components";
import { APP_BASE_HREF } from "@angular/common";


/**
 * Load the implementations that should be tested.
 */
/*describe('Meaningful Test', () => {
  it('1 + 1 => 2', () => {
    expect(1 + 1).toBe(2);
  });
});*/

describe('Login', () => {
  let comp: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  /**
   * async beforeEach
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        //BrowserModule,
        //BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
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
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
    /**
     * Compile template and css
     */
      .compileComponents();
  }));

  /**
   * Synchronous beforeEach
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    comp = fixture.componentInstance;

    /**
     * Trigger initial data binding
     */
    fixture.detectChanges();
  });

  it(`should be ready initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

  it(`should be have pass type password`, () => {
    expect(comp.passwordFieldType).toEqual('password');
  });

  it('should init form on ngOnInit', () => {
    spyOn(comp, 'initForm');
    expect(comp.initForm).not.toHaveBeenCalled();

    comp.ngOnInit();
    expect(comp.initForm).toHaveBeenCalled();
  });

  it('should init form on ngOnInit', () => {
    spyOn(comp, 'onChanges');
    expect(comp.onChanges).not.toHaveBeenCalled();

    comp.ngOnInit();
    expect(comp.onChanges).toHaveBeenCalled();
  });
});
