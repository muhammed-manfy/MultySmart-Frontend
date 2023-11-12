import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OfferService } from 'src/app/API Services/Offer/offer.service';
import { UserServiceService } from 'src/app/API Services/User/user-service.service';
import { offersInfo } from 'src/app/Models/Offer.model';

@Component({
  selector: 'app-update-offer',
  templateUrl: './update-offer.component.html',
  styleUrls: ['./update-offer.component.scss']
})
export class UpdateOfferComponent implements OnInit {
  deleteUserApiResponse: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserServiceService
    , private snakBar: MatSnackBar, private route: Router) { }


  ngOnInit(): void {

  }

  async deleteAccount(userId: any) {
    (await this.userService.deleteUser(userId)).subscribe(response => {
      this.deleteUserApiResponse = response;
      this.snakBar.open(this.deleteUserApiResponse.message, "Ok", {
        duration: 3 * 1000,
        horizontalPosition: "end",
        verticalPosition: "bottom",
        panelClass: ['success']
      });
      this.route.navigateByUrl('/login');
      localStorage.removeItem('user-token');
      localStorage.removeItem('user-id');
      localStorage.removeItem('username');
    }, (error) => {
      this.snakBar.open(error.error.message, "Close", {
        duration: 3 * 1000,
        horizontalPosition: "end",
        verticalPosition: "bottom",
        panelClass: ['error']
      });
    });
  }
}
