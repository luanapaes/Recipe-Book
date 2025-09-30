import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlApi = 'http://localhost:3000/auth';
  httpClient = inject(HttpClient);

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  logado() {
    return this.isBrowser() && localStorage.getItem('token') ? true : false;
  }

  login(email: string, password: string) {
    return this.httpClient.post(`${this.urlApi}/signin`, { email, password });
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
