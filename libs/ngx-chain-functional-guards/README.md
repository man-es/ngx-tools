<p style="text-align: center;">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/man-es/ngx-tools/master/images/man-es-ngx-tools-dark.svg">
    <img alt="Nx - Smart Monorepos · Fast CI" src="https://raw.githubusercontent.com/man-es/ngx-tools/master/images/man-es-ngx-tools-dark.svg" width="100%">
  </picture>
</p>

<div style="text-align: center;">

[![License](https://img.shields.io/npm/l/nx.svg?style=flat-square)]()
[![NPM Version](https://badge.fury.io/js/@man-es%2Fngx-chain-functional-guards.svg)](https://www.npmjs.com/package/nx)
[![Semantic Release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)]()

</div>

<hr>

# Ngx Chain Functional Guards

Ngx Chain Functional Guards is a small library that exposes two functions **chainActivationGuards**  and **chainDeactivationGuards**. Both of these functions allow to run guards in a serial manner, waiting for each one to complete before proceeding to the next.

<hr>

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
