import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { IToken, IUserForLogin } from '../models/IUser';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { access } from 'node:fs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl ;
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private tokenSubject: BehaviorSubject<IToken | null> = new BehaviorSubject<IToken | null>(null);


  loggedIn$ = this.loggedInSubject.asObservable();
  token$ = this.tokenSubject.asObservable();


  constructor(private http: HttpClient) {}



  setLoggedIn(state: boolean): void {
    this.loggedInSubject.next(state);
  }

  setToken(state: IToken | null): void {
    this.tokenSubject.next(state);
  }


  registerUser(user: FormData)  {
    return this.http.post(this.baseUrl + '/account/register', user, { withCredentials: true });
  }

  loginUser(user: IUserForLogin) : Observable<IToken> {
    return this.http.post<IToken>(this.baseUrl + '/account/login', user, { withCredentials: true })
      .pipe(tap(token => {
        this.setToken(token);
        this.setLoggedIn(true);
      }));
  }

  logoutUser() {
    return this.http.post(this.baseUrl + '/account/logout',{} ,{ withCredentials: true} );
  }

  refreshToken() : Observable<IToken> {
    return this.http.post<IToken>(this.baseUrl + '/account/refresh-token', { }, { withCredentials: true })
      .pipe(tap(newToken => {
        this.setToken(newToken);
        this.setLoggedIn(true);
      }));
  }



}

