import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, first, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { IToken } from '../models/IUser';

export const authTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);

  return authService.token$.pipe(
    first(),
    switchMap( (token: IToken | null) => {
      let clonedReq = req;
      if (token) {
        clonedReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token.accessToken}` }
        });
      }


      return next(clonedReq).pipe(
        catchError(err => {
          if (err.status === 401) {
            //Access token expired, try refresh

            if(token === null) {
              authService.setToken(null);
              authService.setLoggedIn(false);
              return throwError(() => err);
            }

            return authService.refreshToken().pipe(
              switchMap( (newToken : IToken | null) => {

                const retryReq = req.clone({
                  setHeaders: { Authorization: `Bearer ${newToken?.accessToken}` }
                });

                return next(retryReq);
              }),
              catchError( innerErr => {
                authService.logoutUser().subscribe();
                authService.setToken(null);
                authService.setLoggedIn(false);

                return throwError(() => innerErr);
              })

            );


          }

          return throwError(() => err);
        })


      );

    }),


  );




};
