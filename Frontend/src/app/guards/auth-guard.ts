import { inject } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);

  if(!isBrowser) {
    return false; // avoiding SSR
  }

  return authService.loggedIn$.pipe(
    take(1),
    switchMap(loggedIn => {

      if (loggedIn) {
        return of(true);
      } else {
        router.navigate(['user/login'], { queryParams: { returnUrl: state.url } });
        return of(false);
      }
    })
  );


}
