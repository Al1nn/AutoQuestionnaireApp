import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { IUserForLogin } from '../models/IUser';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl ;
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);


  loggedIn$ = this.loggedInSubject.asObservable();
  token$ = this.tokenSubject.asObservable();


  constructor(private http: HttpClient) {}


  setLoggedIn(state: boolean): void {
    this.loggedInSubject.next(state);
  }

  setToken(state: string | null): void {
    this.tokenSubject.next(state);
  }


  registerUser(user: FormData)  {
    return this.http.post(this.baseUrl + '/account/register', user);
  }

  loginUser(user: IUserForLogin)  {
    return this.http.post(this.baseUrl + '/account/login', user);
  }

}
