import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './login/login.service';
import { tap } from 'rxjs/operators'; // Import tap operator

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  as: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ls: LoginService
  ) { }

  register(data: any) {
    return this.http.post(`${environment.url}/auth/register`, data);
  }

  login(data: any) {
    return this.http.post(`${environment.url}/auth/login`, data).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.ls.saveToken(response.token); // Call public method to store token
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return this.ls.isLoggedIn(); // This should return true if the token is stored
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  cleanUserData() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}