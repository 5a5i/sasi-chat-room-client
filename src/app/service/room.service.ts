import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Room } from '../model/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  baseURL: string = 'http://localhost:3000/api';

  allRooms: Room;
  constructor(private httpClient: HttpClient) { }
  // private socket = io('http://localhost:3000');

  createRoom(name: string, description: string): Observable<Room> {
    const body = {name: name, description: description}
    const token = localStorage.getItem('JWT_TOKEN') || '';
    // console.log(JSON.parse(token))
    return this.httpClient.post<Room>(this.baseURL + '/rooms', body, { headers: { Authorization: `Bearer ${JSON.parse(token)}` } } );
  }

  getRooms(): Observable<Room> {
    return this.httpClient.get<Room>(this.baseURL + '/rooms');
  }
}
