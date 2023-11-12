import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/API Services/Admin/admin-service.service';
import { AdminValidationComponent } from 'src/app/ValidatorNotification/AdminValidation/admin-validation/admin-validation.component';


@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {
  @ViewChild('password') passwordElement!: ElementRef;
  passwordType = "password";
  adminForm !: FormGroup;
  apiResponse: any;

  constructor(public formBuilder: FormBuilder, public snackBar: MatSnackBar,
    private adminService: AdminServiceService , private route:Router) {
    this.adminForm = formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  get email() {
    return this.adminForm.get('email')?.valid;
  }
  get password() {
    return this.adminForm.get('password')?.valid;
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

  public validationNotification() {
    this.snackBar.openFromComponent(AdminValidationComponent, {
      data: {
        email: this.email,
        password: this.password
      },
      horizontalPosition: "end",
      verticalPosition: "bottom",
      duration: 4 * 1000
    });
  }
  public async formSubmit() {
    if (this.adminForm.invalid) {
      this.validationNotification();
    } else {
      let data = {
        email: this.adminForm.get('email')?.value,
        password: this.adminForm.get('password')?.value
      };
      (await this.adminService.loginAdmin(data)).subscribe(response => {
        this.apiResponse = response;
        this.snackBar.open(this.apiResponse.message, "Ok", {
          duration: 3 * 1000,
          panelClass: ['success']
        });
        localStorage.setItem('admin-token',this.apiResponse.token);
        localStorage.setItem('user-type',"admin");
        localStorage.setItem('id-admin',this.apiResponse.id);
        this.route.navigate(['/dashboard']);
      }, (error) => {
        this.snackBar.open(error.error.message, "Ok", {
          duration: 3 * 1000,
          panelClass: ['error']
        });
      });
    }
  }
}