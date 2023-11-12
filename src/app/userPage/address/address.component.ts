import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/API Services/User/user-service.service';
import { User } from 'src/app/Models/User.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup;
  userAddress: any;
  userId = localStorage.getItem('user-id');
  userInfo: any;
  userUpdatedApiResponse: any;
  constructor(private formBuilder: FormBuilder, private userService: UserServiceService,
    private route: Router, private snackBar: MatSnackBar) {
    this.addressForm = this.formBuilder.group({
      'companyName': ['', [Validators.required]],
      'address': ['', [Validators.required]],
      'city': ['', [Validators.required]]
    })
  }
  get companyName() {
    return this.addressForm.get('companyName')?.valid;
  }
  get address() {
    return this.addressForm.get('address')?.valid;
  }
  get city() {
    return this.addressForm.get('city')?.valid;
  }


  async ngOnInit(): Promise<void> {
    (await this.userService.getUser(this.userId)).subscribe((addressResponse: User) => {
      this.userAddress = addressResponse;
      this.userInfo = this.userAddress.data;
    });
  }

  validatioNotification():void{
    this.snackBar.open("Please fill All fields to updated data","Close",{
      duration: 3 * 1000,
      horizontalPosition: "end",
      verticalPosition: "bottom",
      panelClass: ['error']
    });
  }
  async updateAddress(event:any) {
    const emarite = event.target.emarite.value;
    const updateUserData = {
      address:this.addressForm.get('address')?.value,
      city:this.addressForm.get('city')?.value,
      companyName:this.addressForm.get('companyName')?.value,
      emarite:emarite
    };
      (await this.userService.updateAddress(updateUserData, this.userId)).subscribe(response => {
        this.userUpdatedApiResponse = response;
        this.snackBar.open(this.userUpdatedApiResponse.message, "OK", {
          duration: 3 * 1000,
          horizontalPosition: "end",
          verticalPosition: "bottom",
          panelClass: ['success']
        });
        window.location.reload();
      }, (error) => {
        this.snackBar.open(error.error.message, "OK", {
          duration: 3 * 1000,
          horizontalPosition: "end",
          verticalPosition: "bottom",
          panelClass: ['error']
        });
      });
    }

  REGIONS = ['Sharjha', 'Dubai','Abu Dhabi','Al Ain','Um Al Qauin','Ras Al Khima', 'Al Foujirha'];
}
