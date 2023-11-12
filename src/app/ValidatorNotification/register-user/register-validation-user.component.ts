import { Component, OnInit , Inject} from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-validation-user',
  templateUrl: './register-validation-user.component.html',
  styleUrls: ['./register-validation-user.component.scss']
})
export class RegisterUserValidationComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA)public data:any) { }
  
  ngOnInit(): void {
  }

}
