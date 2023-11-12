import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckOutValidationComponent } from '../ValidatorNotification/CheckOutValidation/check-out-validation/check-out-validation.component';
import { OrderServiceService } from '../API Services/Order/order-service.service';
import { OrderCreatedMessageComponent } from '../Dialogs/order-created-message/order-created-message.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  ordersApiResponse: any;
  orders_amount: any;
  products: any;
  subtotal: any;
  PRODUCT_AMOUNT: any;
  totalOrders: Array<any> = [];
  productsData: Array<any> = [];
  userOrderForm!: FormGroup;
  productsOrderInfo: Array<any> = [];
  constructor(private route: ActivatedRoute, private formBuilde: FormBuilder,
    private snackBar: MatSnackBar, private orderService: OrderServiceService,
    private router: Router) {
    this.userOrderForm = this.formBuilde.group({
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'city': ['', [Validators.required]],
      'phone': ['', [Validators.required]],
      'address': ['', [Validators.required]],
    });
  }
  get firstName() {
    return this.userOrderForm.get('firstName')?.valid;
  }
  get lastName() {
    return this.userOrderForm.get('lastName')?.valid;
  }
  get email() {
    return this.userOrderForm.get('email')?.valid;
  }
  get city() {
    return this.userOrderForm.get('city')?.valid;
  }
  get address() {
    return this.userOrderForm.get('address')?.valid;
  }
  get phone() {
    return this.userOrderForm.get('phone')?.valid;
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(param => {
      this.orders_amount = param.get('orders_amount');
      this.products = param.get('products');
      this.subtotal = param.get('subtotal');
      this.calcTotalOrdersPrice(JSON.parse(this.products));
    });
    this.productsData = JSON.parse(this.products);
    this.totalOrders = JSON.parse(this.subtotal);
    this.getProductsOrderInfo(this.productsData);
  }

  notificationValidation() {
    this.snackBar.openFromComponent(CheckOutValidationComponent, {
      data: {
        firstName: this.firstName,
        lastName: this.lastName,
        address: this.address,
        city: this.city,
        email: this.email,
        phone: this.phone
      },
      duration: 3 * 1000,
      horizontalPosition: "end",
      verticalPosition: "bottom",
      panelClass: ['error']
    });
  }

  getProductsOrderInfo(productsData: any): void {
    for (let index = 0; index < productsData.length; index++) {
      this.productsOrderInfo.push({
        product: productsData[index],
        amount: localStorage.getItem(`${productsData[index].productName}_COUNT`),
        status: "ORDERED",
        ID_NO: index + 1
      });
    }
  }

  getUsername(): string {
    let firstName = this.userOrderForm.get('firstName')?.value;
    let lastName = this.userOrderForm.get('lastName')?.value;
    return firstName + " " + lastName;
  }

  async ordersRequest(event: any) {
    if (!this.userOrderForm.valid) {
      this.notificationValidation();
    } else {
      const productsOrder = this.productsOrderInfo.map((product: any) => {
        return product;
      });
      let orderData = {
        products: productsOrder,
        username: this.getUsername(),
        address: this.userOrderForm.get('address')?.value,
        city: this.userOrderForm.get('city')?.value,
        emarite: (event.target.emarite.value),
        companyName: (event.target.companyName.value),
        phone: this.userOrderForm.get('phone')?.value,
        email: this.userOrderForm.get('email')?.value,
        amount: this.totalOrders.length,
        subtotal: this.getTotalOrders()
      };
      var phoneValid = /\d/.test(orderData.phone);
      var emailPattern = /^([A-Za-z][0-9]*[-_]*)+@([\w-]+\.)+[\w-]{2,4}$/;
      var emailValid = emailPattern.test(orderData.email);
      if (!emailValid) {
        this.snackBar.open('Please enter an email valid', "Close");
        return;
      }else if (!phoneValid){
        this.snackBar.open('Please enter only numrics', "Close");
        return;
      }
      (await this.orderService.orderRequset(orderData)).subscribe(response => {
        this.ordersApiResponse = response;
        var user = { email: orderData.email, phone: orderData.phone };
        this.snackBar.openFromComponent(OrderCreatedMessageComponent, {
          data: user,
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 5 * 1000
        });
        setTimeout(() => {
          this.router.navigateByUrl("/");
        }, 5000);
        localStorage.clear();
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

  calcTotalOrdersPrice(productsData: any) {
    for (let product of productsData) {
      let productName = product.productName;
      let productPrice = product.price;
      this.PRODUCT_AMOUNT = localStorage.getItem(`${productName}_COUNT`);
      this.totalOrders.push(productPrice * this.PRODUCT_AMOUNT);
    }
  }

  getTotalOrders() {
    return this.totalOrders.reduce(function (preValue, postValue, currentValue) {
      return postValue + currentValue;
    }, 0);
  }

  REGIONS = ['Sharjha', 'Dubai', 'Abu Dhabi', 'Al Ain', 'Um Al Qauin', 'Ras Al Khima', 'Al Foujirha'];
}
