import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Authenticator } from './authenticator';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Authenticator);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
