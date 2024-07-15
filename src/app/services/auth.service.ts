import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginResponse {
  message: string;
}

interface ValidationResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse> {
    console.log('Attempting login with username:', username);

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password }, { withCredentials: true })
      .pipe(
        tap(response => console.log('Login successful, response:', response)),
        catchError((error: HttpErrorResponse) => {
          console.error('Login error:', error);
          throw error;
        })
      );
  }

  validateToken(): Observable<string> {
    console.log('Attempting to validate token');

    return this.http.get(`${this.apiUrl}/validate-token`, { responseType: 'text', withCredentials: true })
      .pipe(
        tap(response => console.log('Token validation successful, response:', response)),
        catchError((error: HttpErrorResponse) => {
          console.error('Token validation error:', error);
          throw error;
        })
      );
  }
}
