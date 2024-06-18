import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormField, MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatDialog, MatDialogRef, MatDialogClose, MatDialogActions, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import * as io from 'socket.io-client';

import { MessageService } from '../service/message.service';
import { RoomService } from '../service/room.service';
import { UserService } from '../service/user.service';
import { AuthService } from '../auth.service';

export interface DialogData {
  description: string;
  name: string;
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MatIcon
  ],
  providers: [
    UserService
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @Input()
  currentUser;
  authId;

  userList: any[] = [];
  roomList: any[];
  chatList: any[];
  selectChat: any[];
  roomId: string;
  roomDescription: string;
  messageContent: string;
  message: string;
  messages: any[] = [];

  description: string;
  name: string;

  socket: any;

  constructor(
    private router: Router,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private messageService: MessageService,
    private roomService: RoomService,
    private userService: UserService,
    private authService: AuthService,

  ) {
    this.currentUser = authService.user$;
    this.authId = localStorage.getItem('authId');
    this.roomDescription = "Sasi's room"
  }

  ngOnInit() {
    console.log("main componenet..");
    this.roomService.getRooms().subscribe(
      (data:any) => {
        // console.log("receive response")
        this.roomList = data;
        // console.log(this.roomList[0]["_id"]);
        // console.log(this.roomList);
        if(data[0]) {
          this.roomId = data[0]["_id"];
          this.onRoomSelect(this.roomId);
        }
      },
      (err:any) => {
        // console.log("with error");
      },
      () => {
        // console.log("finally");
      }
    );

    this.socket = io.io("http://localhost:3001");
    this.socket.on('connect' ,() => {
      this.socket.emit('user_connected', this.authId);
    });
    this.socket.on('user_status', (users:object) => {
      // console.log(users)
      console.log(this.authId)
      console.log(this.userList)

      this.userList = this.userList.map(userdatas => { return { ...userdatas, isActive: (this.authId == userdatas._id || userdatas._id in users) }});

      console.log(this.userList)
    });
    this.socket.on('message-broadcast', (data:any) => {
      // console.log(data)
      let isPresent = this.selectChat.some((chats) => chats._id === data._id);
      console.log(isPresent);
      if(!isPresent) this.selectChat.push(data);
    });

  }

  sendMessage() {
    let message = this.message ?? null;
    let roomId = this.roomId ?? null;
    // console.log(roomId);
    // console.log(message);
    this.messageService.sendMessage(roomId, message).subscribe(
      (data:any) => {
        // console.log("receive response")
        // console.log(data.message)
        if('data' in data) {
          this.selectChat.push(data.data)
          console.log(data.data)
          this.socket = io.io("http://localhost:3001");
          this.socket.emit('message', data.data);
          // console.log(data.data)
        }
      },
      (err:any) => {
        // console.log("with error");
      },
      () => {
        // console.log("finally");
        // console.log(localStorage.getItem('loginToken'))
      }
    );

    this.message = '';
  }

  edit() {
    console.log("edit..")
    this.router.navigate(['/main', 'user']);
  }

  login() {
    console.log("login")
    this.router.navigate(['/main', 'user', 'entry'])
  }

  newRoom(): void {
    let dialogRef = this.dialog.open(NewRoomDialog, {
      width: '50%',
      data: {name: this.name, description: this.description}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.description = result;
    });
  }

  onRoomSelect(id:string) {
    const selected = this.roomList.filter((room) => room["_id"] == id)
      // console.log(selected)
      this.roomId = id;
      this.roomDescription = selected[0]["description"];
      this.messageService.getAllMessages(id).subscribe(
        (data:any) => {
          // console.log("receive response")
          // console.log(id);
          // console.log(data);
          this.selectChat = data;
          let users = data.map((data:any) => data.userId);
          let uniques = Array.from(new Set(users.map((user:any) => user._id)))
                              .map(_id => users.find((user:any) => user._id === _id));

          let active = uniques.map(userdatas => { return { ...userdatas, isActive: (userdatas.tisActive || this.authId == userdatas._id) }});
          this.userList = [...active];
          // console.log(this.userList);
        },
        (err:any) => {
          // console.log("with error");
        },
        () => {
          // console.log("finally");
        }
      );
  }

  public onLogoutClick(): void {
    this.authService.logout();
    this.socket.disconnect();
  }

}
@Component({
  selector: 'newroom',
  templateUrl: './newroom.component.html',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormField,
    MatDialogClose
  ],
})
export class NewRoomDialog {

  constructor(
    public dialogRef: MatDialogRef<NewRoomDialog>,
    private roomService: RoomService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public roomdata: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  createRoom(): void {

    // console.log("register");
    let roomdata = this.roomdata;
    let name = roomdata ? roomdata.name : '';
    let description = roomdata ? roomdata.description : '';

    this.roomService.createRoom( name, description).subscribe(
      (data:any) => {
        // console.log(data)
        // this.registerSucess=true;
        let snackBarRef = this.snackBar.open(data.message);

        // MainComponent.onRoomSelect(this.roomId);
      },
      (err:any) => {
        // console.log("with error");
        // console.log(err.error.message);
        let snackBarRef = this.snackBar.open(err.error.message);
      },
      () => {
        // console.log("finally");
      }
    );
    this.dialogRef.close();
  }

}
