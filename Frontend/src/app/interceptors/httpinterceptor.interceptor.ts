import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from "@angular/common/http";
import { catchError, Observable, retry } from "rxjs";

@Injectable()
export class HttpErrorInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let apiErrorMessage = "";
        if (error.error && error.error.errorMessage) {
          apiErrorMessage = error.error.errorMessage;
        } else {
          apiErrorMessage = "An unknown error occurred";
        }
        console.log(apiErrorMessage);
        throw error;
      })
    );
  }
}
