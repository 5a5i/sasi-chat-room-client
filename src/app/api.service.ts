import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl || 'http://localhost:3000/api';

  private authUrl = environment.authUrl || 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getRooms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/rooms`);
  }

  getMessagesByRoom(roomId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/messages/${roomId}`);
  }

  // Add other API methods for message creation, user authentication, etc.
}
