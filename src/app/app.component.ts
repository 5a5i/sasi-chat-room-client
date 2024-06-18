import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions, MatCardHeader } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbar,
    MatMenu,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatCardHeader,
    MatMenuTrigger,
    MatIcon
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = environment.appName || 'Chat Room';

  constructor(public dialog: MatDialog, private authService: AuthService) {

  }

  openDialog() {

  }

  edit() { }

  public onLogoutClick(): void {
    this.authService.logout();
  }


}
