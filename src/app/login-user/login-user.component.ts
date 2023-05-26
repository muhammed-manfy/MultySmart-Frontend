import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VERSION } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent {
  passwordType = "password";
  constructor() {

  }
  @ViewChild('password') passwordElement!: ElementRef;
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
}
