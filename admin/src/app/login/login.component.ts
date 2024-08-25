import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TokenService } from '../services/token/token.service'; 
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginMode: boolean = true;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      this.loginService.onLoginSubmit(this.loginForm.value)
        .pipe(
          catchError(error => {
            console.error('Login failed', error);
            alert('Login failed. Please check your credentials and try again.');
            return of(null);  // Return an empty observable to continue the stream
          })
        )
        .subscribe(response => {
          if (response) {
            console.log('Login successful', response);
            alert('Login successful!');
            this.tokenService.setToken(response.token);
          this.tokenService.setUser({name:response.name,email:response.email});
            // window.location.href = 'http://localhost:4200/dashboard';  // Redirect to full URL
            this.router.navigate(['/dashboard']);  // Redirect to dashboard after successful login
          }
        });
    }
  }
  
  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      this.loginService.onRegisterSubmit(this.registerForm.value)
        .pipe(
          catchError(error => {
            console.error('Registration failed', error);
            alert('Registration failed. Please try again.');
            return of(null);  // Return an empty observable to continue the stream
          })
        )
        .subscribe(response => {
          if (response) {
            console.log('Registration successful', response);
            alert('Registration successful! You can now log in.');
            this.isLoginMode = true;  // Switch to login mode after successful registration
          }
        });
    }
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

}