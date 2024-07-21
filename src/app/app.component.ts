import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        this.message = 'Zalogowano pomyślnie';
        console.log('Login successful:', response);
      },
      error => {
        this.message = 'Błąd logowania';
        console.error('Login error:', error);
      }
    );
  }

  validateToken() {
    this.authService.validateToken().subscribe(
      response => {
        this.message = 'Token jest ważny';
        console.log('Token validation successful:', response);
      },
      error => {
        this.message = 'Token jest nieważny lub wygasł';
        console.error('Token validation error:', error);
      }
    );
  }
}