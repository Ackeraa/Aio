import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

export function resetGuard(route: ActivatedRouteSnapshot): boolean {
  const accessToken = route.queryParams['token'];
  const client = route.queryParams['client'];
  const uid = route.queryParams['uid'];
  const expiry = route.queryParams['expiry'];

  if (accessToken && client && uid && expiry) {
    return true;
  } else {
    inject(Router).navigate(['/auth/login']);
    return false;
  }
}
