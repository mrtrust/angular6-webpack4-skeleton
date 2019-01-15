import { UIRouter } from '@uirouter/core';
//import { Visualizer } from '@uirouter/visualizer';
import { requiresAuthHook } from './core/hooks/auth.hook';
import { requiresAuthRoleHook } from './core/hooks/auth.role.hook';
//import { UIRouterRx } from 'ui-router-rx';

export function routerConfigFn(router: UIRouter) {
  const transitionService = router.transitionService;
  requiresAuthHook(transitionService);
  requiresAuthRoleHook(transitionService);

  //enabling router to work with Observables
  //router.plugin(UIRouterRx);

  //router.trace.enable(Category.TRANSITION);
  //router.plugin(Visualizer);
}
