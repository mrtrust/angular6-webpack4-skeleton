import { TransitionService } from '@uirouter/core';
import { AuthenticationService } from '../services/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from '../services/token.service';
import { loginState } from '../../app.states';

/**
 * This file contains a Transition Hook which protects a
 * route that requires authentication.
 *
 * This hook redirects to /login when both:
 * - The user is not authenticated
 * - The user is navigating to a state that requires authentication
 */
export function requiresAuthRoleHook(transitionService: TransitionService) {

  //const helper = new JwtHelperService();
  // Matches if the destination state's data property has a truthy 'role' property
  const requiresAuthCriteria = {
    to: (state) => state.data && state.data.role //|| state.name.contains('admin') && !state.name.contains('admin.login')
  };

  // Function that returns a redirect for the current transition to the login state
  // if the user is not currently authenticated (according to the AuthService)

  const redirectToLogin = (transition) => {

    const authService: AuthenticationService = transition.injector().get(AuthenticationService);
    const tokenService: TokenService = transition.injector().get(TokenService);
    const jwtHelperService: JwtHelperService = transition.injector().get(JwtHelperService);
    const $state = transition.router.stateService;
    const toLocation = transition.to();

    let token: string;
    let targetState: string;

    token = tokenService.getToken();
    targetState = loginState.name;

    const payload = jwtHelperService.decodeToken(token);
    const isAuth = !jwtHelperService.isTokenExpired(token);
    if (!isAuth || !toLocation.data.role.includes(payload.iss.roleId)) {
      return $state.target(targetState, undefined, {location: false});
    }
  };

  // Register the "requires auth" hook with the TransitionsService
  transitionService.onBefore(requiresAuthCriteria, redirectToLogin, {priority: 9});
}
