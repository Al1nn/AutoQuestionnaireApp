import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Profile, IToken, IUser, IUserForLogin } from '../models/IUser';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IPhoto } from '../models/IPhoto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl ;
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private tokenSubject: BehaviorSubject<IToken | null> = new BehaviorSubject<IToken | null>(null);

  private profilePictureSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  loggedIn$ = this.loggedInSubject.asObservable();
  token$ = this.tokenSubject.asObservable();
  profilePicture$ = this.profilePictureSubject.asObservable();

  constructor(private http: HttpClient) {}


  setLoggedIn(state: boolean): void {
    this.loggedInSubject.next(state);
  }



  setToken(state: IToken | null): void {
    this.tokenSubject.next(state);
  }

  setProfilePicture(state: string | null): void {
    this.profilePictureSubject.next(state);
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

  profile() : Observable<Profile> {
    return this.http.get<Profile>(this.baseUrl + '/account/me', { withCredentials: true });
  }

  editProfileName (oldName: string, newName: string)  {
    return this.http.patch( `${this.baseUrl}/account/edit/name/${oldName}/${newName}`, {withCredentials: true});
  }

  editProfileEmail (oldEmail: string, newEmail: string)  {
    return this.http.patch( `${this.baseUrl}/account/edit/email/${oldEmail}/${newEmail}`, {withCredentials: true});
  }

  editProfilePhoneNumber (oldPhoneNumber: string, newPhoneNumber: string)  {
    return this.http.patch( `${this.baseUrl}/account/edit/phoneNumber/${oldPhoneNumber}/${newPhoneNumber}`, {withCredentials: true});
  }

  editProfilePicture (picture: FormData) : Observable<IPhoto>  {
    return this.http.patch<IPhoto>( `${this.baseUrl}/account/edit/photo`, picture, {withCredentials: true});
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



}

