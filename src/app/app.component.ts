import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

interface LoginResponse {
  message: string;
}

interface ValidationResponse {
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message = '';
  username = '';
  password = '';

  constructor(private authService: AuthService) {}

  login() {
    console.log('Login button clicked');
    this.authService.login(this.username, this.password).subscribe(
      (response: LoginResponse) => {
        this.message = 'Zalogowano pomyślnie';
        console.log('Login response:', response);
      },
      (error: HttpErrorResponse) => {
        this.message = 'Błąd logowania';
        console.error('Login error:', error);
      }
    );
  }

  validateToken() {
    console.log('Validate Token button clicked');
    this.authService.validateToken().subscribe(
      response => {
        this.message = response;
        console.log('Token validation response:', response);
      },
      error => {
        this.message = error.error;
        console.error('Token validation error:', error);
      }
    );
  }
}
