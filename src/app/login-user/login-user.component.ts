import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserServiceService } from '../API Services/User/user-service.service';
import { LoginUserValidationComponent } from '../ValidatorNotification/login-user/login-user-validation.component';
import { BasicApiService } from '../API Services/Basic/basic-api.service';
import { MatDialog } from '@angular/material/dialog';
import { config } from 'rxjs';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent {
  passwordType = "password";
  loginForm!: FormGroup;
  @ViewChild('password') passwordElement!: ElementRef;
  userApiResponse: any;
  username: String = '';
  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar,
    private route: Router, private userService: UserServiceService , private dialog:MatDialog) {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });
  }

  get email() {
    return this.loginForm.get('email')?.valid;
  }
  get password() {
    return this.loginForm.get('password')?.valid;
  }

  ngOnInit(): void {

  }

  getUsername(value: string): String {
    this.username = value;
    let usernameArray = this.username.split(' ');
    this.username = usernameArray.join('');
    return this.username;
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordElement.nativeElement.type;
    if (this.passwordType == 'password') {
      this.passwordType = "text"
    } else {
      this.passwordType = "password";
    }
  }

  validationNotification() {
    const data = {email:this.email,password:this.password};
    this.snackBar.openFromComponent(LoginUserValidationComponent,{
      data:data ,
      horizontalPosition:"left",
      verticalPosition:"bottom",
      duration: 3 * 1000
    });
  }

  async login() {
    if (this.loginForm.invalid)
      this.validationNotification();
    else {
      const loginData = {
        email: this.loginForm.get('email')?.value.toString(),
        password: this.loginForm.get('password')?.value.toString(),
      };
      (await this.userService.loginUser(loginData)).subscribe(response => {
        this.userApiResponse = response;
        const timeNow = new Date();
        const expiresInDuration = new Date(timeNow.getTime() + (this.userApiResponse.expiresIn * 1000));
        localStorage.setItem('user-token',this.userApiResponse.token);
        localStorage.setItem('expiresIn-duration',expiresInDuration.toString());
        localStorage.setItem('user-id', this.userApiResponse.id);
        localStorage.setItem('username', this.getUsername(this.userApiResponse.username).toString());
        this.snackBar.open(this.userApiResponse.message, "Ok", {
          duration: 3 * 1000,
          horizontalPosition: "end",
          verticalPosition: "bottom",
          panelClass: ['success']
        });
        let user = localStorage.getItem('username');
        const previousUrl = localStorage.getItem("previousUrl");
        if(previousUrl != null){
          this.route.navigateByUrl('/cart');
        }else{
          this.route.navigateByUrl(`/${user}/profile`);
        }
      }, (error) => {
        this.snackBar.open(error.error.message, "Close", {
          duration: 3 * 1000,
          horizontalPosition: "end",
          verticalPosition: "bottom",
          panelClass: ['error']
        });
      })
    }
  }
}
