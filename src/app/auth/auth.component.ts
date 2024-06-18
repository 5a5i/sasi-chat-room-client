import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDialog, MatDialogModule, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
// import { RegisterDialogComponent } from '../user/register-dialog/register-dialog.component';
import { UserService } from '../service/user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatDialogClose,
    MatInput
  ],
  providers: [
    UserService,
    AuthService
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
// export class AuthComponent {

//   constructor(private router: Router) {}

//   navigateToRooms() {
//     this.router.navigate(['/rooms']);
//   }
// }
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  // registerSucess:boolean = true;

  constructor(
    // public registerDialogRef: MatDialogRef<RegisterDialogComponent>,
    // public loginDialogRef: MatDialogRef<LoginDialogComponent>,
    public dialog: MatDialog,
    @Inject(FormBuilder) public data: any,
    // @Inject(MAT_SNACK_BAR_DATA) public sbdata: any,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  public onRegisterClick(): void {
    // console.log("register");

    let registerdata = this.data;
    let email = registerdata ? registerdata.email : null;
    let username = registerdata ? registerdata.username : null;
    let password = registerdata ? registerdata.password : null;
    let user = { email: email, username: username, password: password };

    this.authService.register(user).subscribe(
      (data:any) => {
        // console.log(data)
        // this.registerSucess=true;
        let snackBarRef = this.snackBar.open(data.message, 'Login');
      },
      err => {
        // console.log("with error");
        // console.log(err.error.message);
        let snackBarRef = this.snackBar.open(err.error.message, 'Login');
      },
      () => {
        console.log("finally");
      }
    );
  }

  public onLoginClick(): void {

    let logindata = this.data;
    let username = logindata ? logindata.username : null;
    let password = logindata ? logindata.password : null;
    let user = { email: username, password: password };

    this.authService.login(user).subscribe(
      (data:any) => {
        // console.log("receive response")
        let snackBarRef = this.snackBar.open(data.message);
        if('token' in data) {
          this.router.navigateByUrl('/main');
          // console.log(data["token"])
        }
      },
      err => {
        // console.log("with error");
        let snackBarRef = this.snackBar.open(err.error.message);
      },
      () => {
        console.log("finally");
        // console.log(localStorage.getItem('loginToken'))
      }
    );

    // console.log(username);
    // console.log(password);

    // this.userService.login(username, password).subscribe(
    //   (data:any) => {
    //     // console.log("receive response")
    //     if('token' in data) {
    //       localStorage.setItem('loginToken', data["token"] ?? null);
    //       this.router.navigateByUrl('/content');
    //       // console.log(data["token"])
    //     }
    //     // console.log(data);
    //     // if(data["status"] == "6666") {
    //     //   console.log("user already exist");
    //     // } else {
    //     //   console.log("create successful");
    //     //   console.log(data);
    //     // }
    //   },
    //   err => {
    //     console.log("with error");
    //   },
    //   () => {
    //     console.log("finally");
    //     // console.log(localStorage.getItem('loginToken'))
    //   }
    // );
    // inject user service
    // this.loginDialogRef.close();
  }

}
