import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from  'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlApi = 'http://localhost:3000/auth';
  httpClient = inject(HttpClient);
  cookieService = inject(CookieService)

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof this.cookieService !== 'undefined';
  }

  logado() {
    return this.isBrowser() && this.cookieService.get('token') ? true : false;
  }

  login(email: string, password: string) {
    return this.httpClient.post(`${this.urlApi}/signin`, { email, password });
  }

  getToken(){
    return this.cookieService.get('token')
  }
}
