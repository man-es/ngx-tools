import { EnvironmentInjector, inject, runInInjectionContext } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  CanDeactivateFn,
  RouterStateSnapshot
} from '@angular/router'

import { concatMap, first, from, last, takeWhile } from 'rxjs'

import { wrapIntoObservable } from './utils/rxjs.utils'

/**
 * Chains route configured guards on canActivate or canActivateChild, calling them after each other, waiting for each one before calling the next.
 *
 * @param guards The array of guards to process.
 * @returns The result of the first guard that returns `false` or an instance of a `UrlTree`, otherwise `true`.
 */
export function chainActivationGuards(
  guards: CanActivateFn[] | CanActivateChildFn[]
): CanActivateFn | CanActivateChildFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const injector = inject(EnvironmentInjector)

    return from(guards).pipe(
      concatMap(guard => {
        const guardResult = runInInjectionContext(injector, () => guard(route, state))
        return wrapIntoObservable(guardResult).pipe(first())
      }),
      takeWhile(val => val === true, true),
      last()
    )
  }
}

/**
 * Chains route configured guards on canDeactivate, calling them after each other, waiting for each one before calling the next.
 *
 * @param guards The array of guards to process.
 * @returns The result of the first guard that returns `false` or an instance of a `UrlTree`, otherwise `true`.
 */
export function chainDeactivationGuards(guards: CanDeactivateFn<never>[]): CanDeactivateFn<never> {
  return (
    component: never,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ) => {
    const injector = inject(EnvironmentInjector)

    return from(guards).pipe(
      concatMap(guard => {
        const guardResult = runInInjectionContext(injector, () =>
          guard(component, route, state, nextState)
        )
        return wrapIntoObservable(guardResult).pipe(first())
      }),
      takeWhile(val => val === true, true),
      last()
    )
  }
}
