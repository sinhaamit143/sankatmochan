import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TokenService } from './token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  as: any;

  constructor(
    private http :HttpClient,
    private router:Router,
    private ts : TokenService
  ) { }

  register(data:any) {
    return this.http.post(`${environment.url}/auth/register`, data);
  }

  login(data:any) {
    return this.http.post(`${environment.url}/auth/login`, data);
  }

  isLoggedIn(): boolean {
    if (this.ts.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    localStorage.removeItem('Token');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  cleanUserData() {
    localStorage.removeItem('user');
    localStorage.removeItem('Token');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}