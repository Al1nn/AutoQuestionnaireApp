import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl ;

  constructor(private http: HttpClient) {}

  registerUser(user: FormData)  {
    return this.http.post(this.baseUrl + '/account/register', user);
  }

}
