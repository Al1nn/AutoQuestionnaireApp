import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { IToken, IUser, IUserForLogin } from '../models/IUser';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


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

  get token(): IToken | null {
    return this.tokenSubject.value;
  }

  get isLoggedIn(): boolean {
    return this.loggedInSubject.value;
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


  decodeToken(token: IToken): IUser {
  try {
    const payload = token.accessToken.split('.')[1];
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    const parsed = JSON.parse(decodedPayload);

    const user: IUser = {
      id: parsed["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
      name: parsed["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      photo: parsed.Photo || "", // your token has "Photo"
      role: parsed["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    };

    return user;
  } catch (error) {
    console.error('Invalid JWT', error);
    throw new Error('Token could not be decoded');
  }




}
checkAuthStatus(): Observable<boolean> {
    if (this.isLoggedIn && this.token) {
      return of(true);
    }

    return this.refreshToken().pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}


