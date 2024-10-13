import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { LoginService } from './login/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private ls: LoginService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    const token = this.ls.getToken();
    console.log('Token:', token);

    if (token !== null && token !== undefined && typeof token === 'string') {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Request headers:', request.headers);
    } else {
      console.error('Token is null, undefined or not a string');
    }

    return next.handle(request);
  }
}