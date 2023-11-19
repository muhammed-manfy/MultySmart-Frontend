import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDateFormats } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/API Services/User/user-service.service';
import { User } from 'src/app/Models/User.model';
import { UpdateOfferComponent } from 'src/app/admin/UpdateData/update-offer/update-offer.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  emailApiResponse: any;
  phoneApiResponse: any;
  passwordApiResponse: any;
  emailDisplay = true;
  emailHidden = false;
  phoneDisplay = true;
  phoneHidden = false;
  passwordDisplay = true;
  passwordHidden = false;
  imageDisplay = true;
  imageHidden = false;
  passwordType: string = 'password';
  @ViewChild('password') passwordElement!: ElementRef;
  profileForm!: FormGroup;
  userInfo: any;
  imageUpload: any;
  ChangeImageApiResponse: any;
  deleteUserApiResponse: any;
  userId = localStorage.getItem('user-id');
  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar,
    private userService: UserServiceService, private route: Router,
    private dialog: MatDialog) {
    this.profileForm = this.formBuilder.group({
      'email': ['', [Validators.required]],
      'phone': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'image': ['', [Validators.required]]
    });
  }

  get email() {
    return this.profileForm.get('email')?.valid;
  }
  get phone() {
    return this.profileForm.get('phone')?.valid;
  }
  get password() {
    return this.profileForm.get('password')?.valid;
  }
  get image() {
    return this.profileForm.get('image')?.valid;
  }

  async ngOnInit(): Promise<void> {
    (await this.userService.getUser(this.userId)).subscribe((userData: User) => {
      this.userInfo = userData;
    });
  }

  async updateEmail() {
    let emailValue = {
      email: this.profileForm.get('email')?.value
    }
    if (!this.email) {
      this.snackBar.open("Please enter your email", "Close", {
        duration: 3 * 1000,
        horizontalPosition: "end",
        verticalPosition: "bottom",
        panelClass: ['error']
      });
    } else {
      var email = this.profileForm.get('email')?.value;
      var emailPattern = /^([A-Za-z][0-9]*[-_]*)+@([\w-]+\.)+[\w-]{2,4}$/;
      var emailValid = emailPattern.test(email);
      if (!emailValid) {
        this.snackBar.open('Please enter an email valid', "Close");
        return;
      }
      (await this.userService.updateEmailUser(emailValue, this.userId)).subscribe((response => {
        this.emailApiResponse = response;
        this.snackBar.open(this.emailApiResponse.message, "Ok", {
          duration: 3 * 1000,
          horizontalPosition: "end",
          verticalPosition: "bottom",
          panelClass: ['success']
        });
        window.location.reload();
      }), (error => {
        this.snackBar.open(error.error.message, "Close", {
          duration: 3 * 1000,
          horizontalPosition: "end",
          verticalPosition: "bottom",
          panelClass: ['error']
        });
      }));
    }
  }

  uploadImage($event: any) {
    const file = $event.target.files[0];
    this.imageUpload = file;
  }

  async updatePhone() {
    let phoneValue = {
      phone: this.profileForm.get('phone')?.value
    }
    if (!this.phone) {
      this.snackBar.open("Please enter your phone", "Close", {
        duration: 3 * 1000,
        horizontalPosition: "end",
        verticalPosition: "bottom",
        panelClass: ['error']
      });
    } else {
      var userPhoneNumber = this.profileForm.get('phone')?.value;
      if (userPhoneNumber.length > 10 || userPhoneNumber < 10) {
        this.snackBar.open("Please enter phone number with 10 numbers", "Close", {
          duration: 3 * 1000,
          horizontalPosition: "end",
          verticalPosition: "bottom",
          panelClass: ['error']
        });
        return;
      }
      (await this.userService.updatePhoneUser(phoneValue, this.userId)).subscribe((response => {
        this.phoneApiResponse = response;
        this.snackBar.open(this.phoneApiResponse.message, "Ok", {
          duration: 3 * 1000,
          horizontalPosition: "end",
          verticalPosition: "bottom",
          panelClass: ['success']
        });
        window.location.reload();
      }), (error => {
        this.snackBar.open(error.message, "Close", {
          duration: 3 * 1000,
          horizontalPosition: "end",
          verticalPosition: "bottom",
          panelClass: ['error']
        });
      }));
    }
  }
  async changeImageProfile() {
    if (!this.image) {
      this.snackBar.open("Please select an image", "Close", {
        duration: 3 * 1000,
        horizontalPosition: "end",
        verticalPosition: "bottom",
        panelClass: ['error']
      });
    } else {
      if (this.imageUpload.type != 'image/jpeg' || this.imageUpload.type != 'image/jpg' || this.imageUpload.type != 'image/png') {
        this.snackBar.open("please select images jpeg , png , jpg ", "Close", {
          duration: 3 * 1000,
          horizontalPosition: "end",
          verticalPosition: "bottom",
          panelClass: ['error']
        });
        return;
      }
      let image = new FormData();
      image.append('image', this.imageUpload);
      (await this.userService.changeImageProfile(this.userId, image)).subscribe(response => {
        this.ChangeImageApiResponse = response;
        this.snackBar.open(this.ChangeImageApiResponse.message, "Close", {
          duration: 3 * 1000,
          horizontalPosition: "end",
          verticalPosition: "bottom",
          panelClass: ['success']
        });
        window.location.reload();
      }, (error) => {
        this.snackBar.open(error.error.message, "Close", {
          duration: 3 * 1000,
          horizontalPosition: "end",
          verticalPosition: "bottom",
          panelClass: ['error']
        });
      });
    }
  }
  async updatePassword() {
    let passwordValue = {
      password: this.profileForm.get('password')?.value
    }
    if (!this.password) {
      this.snackBar.open("Please enter your password", "Close", {
        duration: 3 * 1000,
        horizontalPosition: "end",
        verticalPosition: "bottom",
        panelClass: ['error']
      });
      return;
    } else {
      var password = this.profileForm.get('password')?.value;
      var passwordPattern = /^([A-Z]{1,2}[a-z]{3,10})+([!@#$%&]{1,2}[0-9]{3,8})/
      var passwordValid = passwordPattern.test(password);
      if (!passwordValid) {
        this.snackBar.open(`password must be UpperCase  LowerCase Complicated Letters numrics
           from 8 to 12`, "Close");
        return;
      }
      (await this.userService.updatePasswordUser(passwordValue, this.userId)).subscribe((response => {
        this.passwordApiResponse = response;
        this.snackBar.open(this.passwordApiResponse.message, "Ok", {
          duration: 3 * 1000,
          horizontalPosition: "end",
          verticalPosition: "bottom",
          panelClass: ['success']
        });
        window.location.reload();
      }), (error => {
        this.snackBar.open(error.message, "Close", {
          duration: 3 * 1000,
          horizontalPosition: "end",
          verticalPosition: "bottom",
          panelClass: ['error']
        });
      }));
    }
  }

  async deleteUser() {
    this.dialog.open(UpdateOfferComponent, {
      data: {
        userId: this.userId
      }
    });
  }

  showPassword() {
    this.passwordType = this.passwordElement.nativeElement.type;
    if (this.passwordType == 'text') {
      this.passwordType = 'password';
    } else {
      this.passwordType = 'text';
    }
  }
  emailToggled() {
    this.emailDisplay = !this.emailDisplay;
    this.emailHidden = !this.emailHidden;
  }
  phoneToggled() {
    this.phoneDisplay = !this.phoneDisplay;
    this.phoneHidden = !this.phoneHidden;
  }
  passwordToggled() {
    this.passwordDisplay = !this.passwordDisplay;
    this.passwordHidden = !this.passwordHidden;
  }

  imageToggled() {
    this.imageDisplay = !this.imageDisplay;
    this.imageHidden = !this.imageHidden;
  }
}
