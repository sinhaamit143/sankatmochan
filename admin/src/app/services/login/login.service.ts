import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators'; // Import tap operator

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private tokenKey = 'token';  // Key for storing token in localStorage

  constructor(private httpClient: HttpClient) { }

  // Handle login and store token
  onLoginSubmit(loginForm: LoginForm): Observable<any> {
    return this.httpClient.post(`${environment.url}/auth/login`, loginForm).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }

  // Handle user registration
  onRegisterSubmit(registerForm: RegisterForm): Observable<any> {
    return this.httpClient.post(`${environment.url}/auth/register`, registerForm);
  }

  // Store the token in localStorage
  public saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Retrieve token from localStorage
  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    console.log('Token from local storage:', token);
    return token;
  }

  // Clear token on logout
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}