import { Component,Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-user-validation',
  templateUrl: './login-user-validation.component.html',
  styleUrls: ['./login-user-validation.component.scss']
})
export class LoginUserValidationComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA)public data:any) { }

  // ngOnInit(): void {
  // }

}
