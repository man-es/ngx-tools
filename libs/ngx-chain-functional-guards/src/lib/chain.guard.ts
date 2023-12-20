import { EnvironmentInjector, inject, runInInjectionContext } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  CanDeactivateFn,
  RouterStateSnapshot
} from '@angular/router'

import { concatMap, from, last, Observable, of, takeWhile } from 'rxjs'

/**
 * Helper to transform value to an Observable
 * @param value - either a value, a promise or an observable
 * @returns an observable of the value
 */
function wrapIntoObservable<T>(value: T | Promise<T> | Observable<T>): Observable<T> {
  if (value instanceof Observable) {
    return value
  } else if (value instanceof Promise) {
    return from(value)
  } else {
    return of(value)
  }
}

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
        return wrapIntoObservable(guardResult)
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
        return wrapIntoObservable(guardResult)
      }),
      takeWhile(val => val === true, true),
      last()
    )
  }
}
