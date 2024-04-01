/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserForLogin, UserForRegister } from '../model/user';
import { TokenApiModel } from '../model/token.api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  authUser(user: UserForLogin)
  {
    return this.http.post(this.baseUrl + '/account/login', user);
  }

  registerUser(user: UserForRegister){
    return this.http.post(this.baseUrl + '/account/register', user);
  }

  getToken(){
    return sessionStorage.getItem('accessToken')
  }

  getRefreshToken(){
    return sessionStorage.getItem('refreshToken')
  }

  storeToken(tokenValue: string){
    sessionStorage.setItem('accessToken', tokenValue)
  }
  
  storeRefreshToken(tokenValue: string){
    sessionStorage.setItem('refreshToken', tokenValue)
  }

  renewToken(tokenApi: TokenApiModel): any
  {
    return this.http.post(this.baseUrl + '/account/refresh', tokenApi);
  }
  
}
