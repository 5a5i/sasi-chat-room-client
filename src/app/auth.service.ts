import { HttpClient } from '@angular/common/http';
import { Injectable, inject, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface Authenticate {
  userId: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() getLoggedInId: EventEmitter<any> = new EventEmitter();
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<Authenticate | null>(null);
  user$ : Observable<Authenticate | null> = this.userSubject.asObservable();
  private router = inject(Router);
  private http = inject(HttpClient);

  constructor() {}

  register(user: { email: string; username: string; password: string }): Observable<any> {
    // console.log(user)
    return this.http.post('http://localhost:3000/auth/register', user);
  }

  login(user: { email: string; password: string }): Observable<any> {
    // console.log(user)
    return this.http
      .post('http://localhost:3000/auth/login', user)
      .pipe(
        tap((data: any) => {
            this.doLoginUser(user.email, JSON.stringify(data.token));
            localStorage.setItem('authId', data.userId);
            this.userSubject.next({userId: data.userId, username: data.username});
            this.getLoggedInId.emit(true);
          }
        )
      );
  }

  private doLoginUser(email: string, token: any) {
    this.loggedUser = email;
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getCurrentAuthUser() {
    return this.http.get('http://localhost:3000/auth/profile');
  }

  isLoggedIn() {
    const token = localStorage.getItem(this.JWT_TOKEN) || null;
    return !!token;
  }

  isTokenExpired() {
    const tokens = localStorage.getItem(this.JWT_TOKEN);
    if (!tokens) return true;
    const token = JSON.parse(tokens).access_token;
    const decoded = jwtDecode(token);
    if (!decoded.exp) return true;
    const expirationDate = decoded.exp * 1000;
    const now = new Date().getTime();

    return expirationDate < now;
  }

  refreshToken() {
    let tokens: any = localStorage.getItem(this.JWT_TOKEN);
    if (!tokens) return;
    tokens = JSON.parse(tokens);
    let refreshToken = tokens.refresh_token;
    return this.http
      .post<any>('http://localhost:3000/auth/refresh-token', {
        refreshToken,
      })
      .pipe(tap((tokens: any) => this.storeJwtToken(JSON.stringify(tokens))));
  }
}
