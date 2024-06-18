import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Message } from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // private socket = io('http://localhost:3000');
  baseURL: string = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) { }

  sendMessage(roomId:string, message: string): Observable<Message>{
      const body = {roomId: roomId, content: message}
      const token = localStorage.getItem('JWT_TOKEN') || '';
      // console.log(JSON.parse(token))     // return this.httpClient.post<Message>(this.baseURL + '/messages', body);
      return this.httpClient.post<Message>(this.baseURL + '/messages', body, { headers: { Authorization: `Bearer ${JSON.parse(token)}` } } );
  }

  // getMessages() {
  //   let observable = new Observable<{ user: String, message: String }>(observer => {
  //     this.socket.on('message', (data) => {
  //       observer.next(data);
  //     });
  //     return () => { this.socket.disconnect(); };
  //   });
  //   return observable;
  // }

    getAllMessages(roomId:string): Observable<Message> {
      return this.httpClient.get<Message>(this.baseURL + '/messages/' + roomId);
    }
}
