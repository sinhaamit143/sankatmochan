import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      console.log('User is logged in, access granted.');
      return true;
    } else {
      console.log('User is not logged in, redirecting to login.');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  if (!authService.isLoggedIn()) {
    return false;
  }
  return true;
};
