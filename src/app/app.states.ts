import { Transition } from '@uirouter/core';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/404/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { Roles } from './core/enums/role.enum';
import { ForgetPasswordComponent } from "./pages/forget-password/forget-password.component";
import { SignupComponent } from "./pages/signup/signup.component";

/**
 * This is the parent state for public site
 */
export const appState = {
  name: 'app',
  redirectTo: 'app.home',
  component: AppComponent,
};

export const notFoundState = {
  parent: 'app',
  name: 'notFound',
  url: '/not-found',
  component: NotFoundComponent,
};

/**
 * This is the login state.  It is activated when the user navigates to /login, or if a unauthenticated
 * user attempts to access a protected state (or substate) which requires authentication. (see routerhooks/requiresAuth.js)
 *
 * It shows a fake login dialog and prompts the user to authenticate.  Once the user authenticates, it then
 * reactivates the state that the user originally came from.
 */

export const loginState = {
  name: 'app.login',
  url: '/login',
  component: LoginComponent,
  resolve: [
    {token: 'returnTo', deps: [Transition], resolveFn: returnTo},
  ]
};

export const homeState = {
  name: 'app.home',
  url: '/',
  component: HomeComponent,
  data: {role: [Roles.User]}
};

/**
 * A resolve function for 'login' state which figures out what state to return to, after a successful login.
 *
 * If the user was initially redirected to login state (due to the requiresAuth redirect), then return the toState/params
 * they were redirected from.  Otherwise, if they transitioned directly, return the fromState/params.  Otherwise
 * return the main "home" state.
 */
export function returnTo($transition$: Transition): any {
  if ($transition$.redirectedFrom() != null) {
    // The user was redirected to the login state (e.g., via the requiresAuth hook when trying to activate contacts)
    // Return to the original attempted target state (e.g., contacts)
    return $transition$.redirectedFrom().targetState();
  }

  const $state = $transition$.router.stateService;

  // The user was not redirected to the login state; they directly activated the login state somehow.
  // Return them to the state they came from.
  if ($transition$.from().name !== '') {
    //TODO: clear from state before logout, then uncomment following string
    //return $state.target($transition$.from(), $transition$.params('from'));
  }

  // If the fromState's name is empty, then this was the initial transition. Just return them to the home state
  return $state.target('app.home');
}

export const signupState = {
  name: 'app.signup',
  url: '/signup',
  component: SignupComponent,
};

export const forgetPasswordState = {
  name: 'app.forget-password',
  url: '/forget-password',
  component: ForgetPasswordComponent,
};

export const APP_STATES = [
  appState,
  notFoundState,
  loginState,
  signupState,
  forgetPasswordState,
  homeState
];
