import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';

// import user service, maybe change later
import { UserService } from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private userService: UserService) { }

  canActivate(): boolean {
    console.log("auth guard called activate");
    // check user service
    return true;
  }

  canActivateChild(): boolean {
    console.log("autho guard called activate child");

    return true;
  }
}
