import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { OrderServiceService } from 'src/app/API Services/Order/order-service.service';
import { UserServiceService } from 'src/app/API Services/User/user-service.service';
import { User } from 'src/app/Models/User.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  userId = localStorage.getItem('user-id');
  userInfo: any;
  productInfo: any;
  productParams: any;
  orderInfo: any;
  orderParams: any;
  username = localStorage.getItem("username");
  constructor(private userService: UserServiceService,private snackBar: MatSnackBar,
     private router: Router, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    (await this.userService.getUser(this.userId)).subscribe(user => {
      this.userInfo = user;
    });
    this.productParams = this.route.snapshot.queryParamMap.get('product');
    this.productInfo = JSON.parse(this.productParams);
    this.orderParams = this.route.snapshot.queryParamMap.get('order');
    this.orderInfo = JSON.parse(this.orderParams);
  }

  getSubtotal(): any {
    return this.productInfo.amount * this.productInfo.product.price;
  } // end getSubtotal

  navigateToProfile() {
    this.router.navigate([`/${this.username}/profile`]);
  }
  navigateToAddress() {
    this.router.navigate([`/${this.username}/address`]);
  }
}
