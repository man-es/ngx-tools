import { Observable, from, of } from 'rxjs'

/**
 * Helper to transform value to an Observable
 * @param value - either a value, a promise or an observable
 * @returns an observable of the value
 */
export function wrapIntoObservable<T>(value: T | Promise<T> | Observable<T>): Observable<T> {
  if (value instanceof Observable) {
    return value
  } else if (value instanceof Promise) {
    return from(value)
  } else {
    return of(value)
  }
}
