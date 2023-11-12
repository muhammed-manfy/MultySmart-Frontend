import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from '../API Services/User/user-service.service';
import { Router } from '@angular/router';
import { RegisterUserValidationComponent } from '../ValidatorNotification/register-user/register-validation-user.component';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  passwordType = "password";
  confirmPasswordType = "password";
  registerForm !: FormGroup;
  apiResponse: any;
  @ViewChild('password') passwordElement!: ElementRef;
  @ViewChild('confirmPassword') confirmPasswordElement!: ElementRef;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar,
    private userService: UserServiceService, private route: Router) {
    this.registerForm = this.formBuilder.group({
      'username': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'confirmPassword': ['', [Validators.required]],
    });
  }
  get username() {
    return this.registerForm.get('username')?.valid;
  }
  get email() {
    return this.registerForm.get('email')?.valid;
  }
  get password() {
    return this.registerForm.get('password')?.valid;
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword')?.valid;
  }

  ngOnInit(): void {

  }

  togglePasswordVisibility() {

    this.passwordType = this.passwordElement.nativeElement.type;
    if (this.passwordType == 'password') {
      this.passwordType = "text"
    } else {
      this.passwordType = "password";
    }
  }

  toggleConfirmPasswordVisibility() {

    this.confirmPasswordType = this.confirmPasswordElement.nativeElement.type;

    if (this.confirmPasswordType == 'password') {
      this.confirmPasswordType = "text"
    } else {
      this.confirmPasswordType = "password";
    }
  }

  passwordCheck = (): boolean => {
    let password = this.registerForm.get('password')?.value;
    let confirmPassword = this.registerForm.get('confirmPassword')?.value;
    if (confirmPassword != password) {
      return false
    }
    return true
  }

  showMessage() {
    this.snackBar.open("password and confirm password is not corresponding!", "Close", {
      duration: 3 * 1000,
      horizontalPosition: "end",
      verticalPosition: "bottom",
    });
  }


  validationNotifications() {
    this.snackBar.openFromComponent(RegisterUserValidationComponent, {
      data: {
        username: this.username,
        email: this.email,
        passsword: this.password,
        confirmPassword: this.confirmPassword
      },
      duration: 3 * 1000,
      horizontalPosition: "end",
      verticalPosition: "bottom",
      panelClass: ['error']
    })
  }
  async registerSubmit() {
    if (!this.registerForm.valid)
      this.validationNotifications();
    else {
      if (!this.passwordCheck()) {
        this.showMessage();
        return;
      }
      var password = this.registerForm.get('password')?.value;
      var email = this.registerForm.get('email')?.value;
      var username = this.registerForm.get('username')?.value;
      var usernameValid = /[A-Za-z]/.test(username);
      var emailPattern = /^([A-Za-z][0-9]*[-_]*)+@([\w-]+\.)+[\w-]{2,4}$/;
      var passwordPattern = /^([A-Z]{1,2}[a-z]{3,10})+([!@#$%&]{1,2}[0-9]{3,8})/
      var passwordValid = passwordPattern.test(password);
      var emailValid = emailPattern.test(email);
      if (!emailValid) {
        this.snackBar.open('Please enter an email valid', "Close");
        return;
      } else if (!passwordValid) {
        this.snackBar.open(`password must be UpperCase  LowerCase Complicated Letters numrics
         from 8 to 12`, "Close");
        return;
      } else if (!usernameValid) {
        this.snackBar.open('Please enter an username valid', "Close");
        return;
      }
      const userData = {
        username: this.registerForm.get('username')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value
      };
      (await (this.userService.registerUser(userData))).subscribe(response => {
        this.apiResponse = response;
        this.snackBar.open(this.apiResponse.message, "Ok", {
          duration: 3 * 1000,
          horizontalPosition: "end",
          verticalPosition: "bottom",
          panelClass: ['success']
        });
        this.route.navigateByUrl('/login');
      }, (error) => {
        this.snackBar.open(error.error.message, "Ok", {
          duration: 3 * 1000,
          horizontalPosition: "end",
          verticalPosition: "bottom",
          panelClass: ['error']
        });
      });
    }
  }

}
