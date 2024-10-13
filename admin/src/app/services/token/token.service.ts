import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  decodedToken: any;
  token: any;
  constructor(
    private route : Router,
  ) { }


  setToken(token: string): void {
    if (token && typeof token === 'string') {
      localStorage.setItem('token', token);
      console.log('Token set:', token);
    } else {
      console.log('Invalid token specified: must be a string');
    }
  }
  getToken(): string | null {
    const token = localStorage.getItem('token');
    console.log('Retrieved token:', token); // Log token to verify it's being retrieved
    console.log('Retrieved token type:', typeof token); // Log token type
    if (token && typeof token === 'string') {
      const decodedToken = jwtDecode(token);
      console.log('Decoded token:', decodedToken); // Log decoded token
      return token;
    } else {
      return null;
    }
  }

  deleteToken() {
    localStorage.removeItem('token');
    this.route.navigate(['/login'])
  }

  setUser (user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  decodeToken() {
    const token = this.getToken();
    if (this.getToken()) {
      this.decodedToken = jwtDecode(this.token);
    }
  }

  getDecodeToken() {
    return jwtDecode(this.token);
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp * 1000 : null;
  }
  
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const expiry = this.getExpiryTime();
    return expiry ? Date.now() >= expiry : true; 
  }
}
