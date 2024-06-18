import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../model/user';
import { RegisterUser } from '../model/register-user';

@Injectable()
export class UserService {

  baseURL: string = 'http://localhost:3000/auth';

  currentUser: User;
  constructor(private httpClient: HttpClient) { }

  getUser(userId: string): User {
    return null as any;
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  // login(username: string, password: string): boolean {
  //   // this.http.get<User>("/user/login").subscribe(data => {
  //   // })
  //   return false;
  // }

  login(username: string, password: string): Observable<User> {
    const body = {email: username, password: password}
    return this.httpClient.post<User>(this.baseURL + '/login', body);
  }

  register(username: string, password: string): Observable<User> {
    const body = {username: username, password: password}
    return this.httpClient.post<User>(this.baseURL + '/register', body);
  }

  logout(): void {
    this.currentUser = null as any;
    // navigate to login page
  }

  isLoggedIn(): boolean {
    return true;
  }
}
