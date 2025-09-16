import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { throwError, timer, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AlertifyService } from '../services/alertify.service';
import { ErrorCode } from '../enums/enums';





export const httpErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const alertifyService = inject(AlertifyService);

  const retryStrategy = (error: HttpErrorResponse, retryCount: number): Observable<number> => {
    if (retryCount >= 3) {
      return throwError(() => error);
    }
    const retryDelay = 1000 * Math.pow(2, retryCount); // exponential backoff
    switch (error.status) {
      case ErrorCode.serverDown:

      case ErrorCode.unauthorised:
        return throwError(() => error);
      default:
        console.log(`Attempt ${retryCount + 1}: retrying in ${retryDelay}ms`);
        return timer(retryDelay);
    }
  };

  const setError = (error: HttpErrorResponse): string => {
    if (error.error && typeof error.error === 'object' && 'message' in error.error) {
      return error.error.message;
    }
    if (error.status === 0) {
      return 'Unable to connect to the server. Please check your internet connection.';
    }
    if (error.status === ErrorCode.badRequest) {
      return error.error?.errorMessage;
    }
    if (error.status === ErrorCode.unauthorised) {
      return error.error?.errorMessage || 'Unauthorized access'; //error.error is null, what TO DO IF IT IS NULL ?
    }
    if (typeof error.error === 'string') {
      return error.error;
    }
    return error.message || 'An unknown error occurred';
  };

  console.log('HTTP Request started');
  return next(req).pipe(
    retry({
      count: 3,
      delay: (error, retryCount) => retryStrategy(error, retryCount)
    }),
    catchError((error: HttpErrorResponse) => {
      const errorMessage = setError(error);
      console.error('HTTP Error:', error);

      const messageToShow = error.error?.errorMessage || errorMessage || 'Unexpected error';
      alertifyService.error(messageToShow);


      return throwError(() => new Error(errorMessage));
    })
  );
};
