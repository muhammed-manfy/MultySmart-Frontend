import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminServiceService } from 'src/app/API Services/Admin/admin-service.service';
import { AdminValidationComponent } from 'src/app/ValidatorNotification/AdminValidation/admin-validation/admin-validation.component';
import { ShowVideoNotificatoinsComponent } from 'src/app/ValidatorNotification/ValidatorVideo/show-video-notificatoins/show-video-notificatoins.component';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  profileForm !: FormGroup;
  passwordType = "password";
  adminId: any ;
  token :any ;
  apiResponse:any;
  @ViewChild('password') passwordElement!: ElementRef;
  passwordApiResponse: any;
  emailApiResponse: any;
  constructor(public formBuilder: FormBuilder, public snackBar: MatSnackBar,
    private dialog: MatDialog, private adminService: AdminServiceService) {
    this.profileForm = this.formBuilder.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]],
    });
  }
  get email() {
    return this.profileForm.get('email')?.valid;
  }
  get password() {
    return this.profileForm.get('password')?.valid;
  }
 
  ngOnInit(): void {
  }

  toggleOldPasswordVisibility() {
    this.passwordType = this.passwordElement.nativeElement.type;
    if (this.passwordType == 'password') {
      this.passwordType = "text"
    } else {
      this.passwordType = "password";
    }
  }

  public validationEmailNotification(): void {
    this.snackBar.open("Email is required","Close",{
      duration: 3* 1000,
      horizontalPosition:"end",
      verticalPosition:"bottom",
      panelClass:['error']
    });
  }

  public validationPasswordNotification(): void {
    this.snackBar.open("Password is Required","Close",{
      duration: 3* 1000,
      horizontalPosition:"end",
      verticalPosition:"bottom",
      panelClass:['error']
    });
  }
 
  async updatePassword(){
    if(!this.password){
      this.validationPasswordNotification();
    }else{
      var id = localStorage.getItem('id-admin')?.toString(); 
      var password = {password:this.profileForm.get('password')?.value};
      (await this.adminService.updateProfilePassword(id,password)).subscribe(apiResponse=>{
        this.passwordApiResponse = apiResponse;
        this.snackBar.open(this.passwordApiResponse.message,"Ok",{
          duration: 3 * 1000,
          horizontalPosition:"start",
          verticalPosition:"bottom",
          panelClass:['success']
        });
      },(error)=>{
        this.snackBar.open(error.error.message,"Close",{
          duration: 3 * 1000,
          horizontalPosition:"start",
          verticalPosition:"bottom",
          panelClass:['error']
        });
      })
    }
  }

  async updateEmail(){
    if(!this.email){
      this.validationEmailNotification();
    }else{
      var id = localStorage.getItem('id-admin')?.toString();

      var email = {email:this.profileForm.get('email')?.value}; 
      (await this.adminService.updateProfileEmail(id,email)).subscribe(apiResponse=>{
        this.emailApiResponse = apiResponse;
        this.snackBar.open(this.emailApiResponse.message,"Ok",{
          duration: 3 * 1000,
          horizontalPosition:"start",
          verticalPosition:"bottom",
          panelClass:['success']
        });
      },(error)=>{
        this.snackBar.open(error.error.message,"Close",{
          duration: 3 * 1000,
          horizontalPosition:"start",
          verticalPosition:"bottom",
          panelClass:['error']
        });
      })
    }
  }
}
