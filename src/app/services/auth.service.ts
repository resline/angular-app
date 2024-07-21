import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }, {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response'  // This allows us to see the full response, including headers
    }).pipe(
      tap(response => {
        console.log('Login response:', response);
        console.log('Set-Cookie header:', response.headers.get('Set-Cookie'));
      }),
      map(response => response.body),  // Extract the body for the subscriber
      catchError(this.handleError)
    );
  }

  validateToken(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/validate-token`, {
      withCredentials: true
    }).pipe(
      tap(response => console.log('Token validation response:', response)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('Error:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}