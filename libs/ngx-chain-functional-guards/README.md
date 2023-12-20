# Ngx Chain Functional Guards

Ngx Chain Functional Guards is a small library that exposes two functions **chainActivationGuards**  and **chainDeactivationGuards**. Both of these functions allow to run guards in a serial manner, waiting for each one to complete before proceeding to the next.

## Installation

Requires the following peer dependencies:

- @angular/core  (>= 17.0.0)
- @angular/router  (>= 17.0.0)
- rxjs (>= 7.0.0)


## Example
### canActivate, canActivateChild
```ts
import { chainActivationGuards } from 'ngx-chain-functional-guards';

// In the route config:
{
  path: '...',
  // chain the desired guards
  canActivate: [chainActivationGuards([SomeGuard1, SomeGuard2, ...])],
  ...
}
```

### canDeactivate

```ts
import { chainDeactivationGuards } from 'ngx-chain-guards';

// In the route config:
{
  path: '...',
  // chain the desired guards
  canDeactivate: [chainDeactivationGuards([SomeGuard1, SomeGuard2, ...])],
}
```

## API
### CanActivateChildFn, CanActivateFn
The **chainActivationGuards** function lets you add an array of guards to be executed in a serial manner.

```typescript
export declare function chainActivationGuards(guards: CanActivateFn[] | CanActivateChildFn[]): CanActivateFn | CanActivateChildFn
```

### CanDeactivateFn
The **chainDeactivationGuards** function lets you add an array of guards to be executed in a serial manner.

```typescript
export declare function chainDeactivationGuards(guards: CanDeactivateFn<never>[]): CanDeactivateFn<never>
```
