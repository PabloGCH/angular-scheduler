import { Injectable } from '@angular/core';
import { Observable, of, throwError, delay } from 'rxjs';

export type UserType = 'consumer' | 'provider';

@Injectable({
  providedIn: 'root'
})
export class Authenticator {
  private readonly TOKEN_KEY = 'auth_token';

  login(email: string, password: string): Observable<string> {
    const validUsers = [
      'enduser@example.com',
      'superuser@example.com'
    ];

    if (validUsers.includes(email) && password === '123123') {
      const type: UserType = email.startsWith('superuser') ? 'provider' : 'consumer';
      const token = `mock-jwt-token-${type}-${btoa(email)}`;
      localStorage.setItem(this.TOKEN_KEY, token);
      return of(token).pipe(delay(1000));
    }

    return throwError(() => new Error('Invalid credentials')).pipe(delay(1000));
  }

  getUserType(): UserType | null {
    const token = this.getToken();
    if (!token) return null;
    if (token.includes('-provider-')) return 'provider';
    if (token.includes('-consumer-')) return 'consumer';
    return null;
  }

  isLoggedIn(): boolean {

    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
