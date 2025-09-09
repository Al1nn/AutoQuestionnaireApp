import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { IUserForLogin } from '../models/IUserForLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl ;

  constructor(private http: HttpClient) {}

  registerUser(user: FormData)  {
    return this.http.post(this.baseUrl + '/account/register', user);
  }

  loginUser(user: IUserForLogin)  {
    return this.http.post(this.baseUrl + '/account/login', user);
  }

}
