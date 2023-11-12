import { Component, OnInit } from '@angular/core';
import { ProductService } from '../API Services/Product/product.service';
import { NavigationEnd, Router } from '@angular/router';
import { UserServiceService } from '../API Services/User/user-service.service';
import { User } from '../Models/User.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderServiceService } from '../API Services/Order/order-service.service';
import { OrderCreatedMessageComponent } from '../Dialogs/order-created-message/order-created-message.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  PRODUCT_ID: any;
  PRODUCT_AMOUNT: any;
  ORDERs_COUNT_IN_CART: any;
  cartCount: any;
  user: any;
  userResponseApi: any;
  userAuthResponse: any;
  getProductsIds: any;
  productsData: Array<any> = [];
  productIds: Array<any> = [];
  productsApiResponse: any;
  totalOrders: Array<any> = [];
  userIsAuthenticated: boolean = false;
  url: any;
  userInfoCompleted: boolean = false;
  productsOrderInfo: Array<any> = [];
  constructor(private productService: ProductService, private router: Router,
    private userService: UserServiceService, private orderService: OrderServiceService
    , private snackBar: MatSnackBar) { }

  async ngOnInit(): Promise<void> {
    this.ORDERs_COUNT_IN_CART = localStorage.getItem('ORDER_COUNT_IN_CART');
    if (this.ORDERs_COUNT_IN_CART != null) {
      this.cartCount = JSON.parse(this.ORDERs_COUNT_IN_CART);
      for (let id = 0; id < this.cartCount.length; id++) {
        this.productIds.push(this.cartCount[id]);
      };
      let productCartIds = { products_ids: this.productIds };
      (await this.productService.getProductsCart(productCartIds)).subscribe(productInfo => {
        this.productsApiResponse = productInfo;
        this.productsData = this.productsApiResponse.data;
        this.calcTotalOrdersPrice(this.productsData);
        this.getProductsOrderInfo(this.productsData);
      });
    }
    this.userIsAuthenticated = this.userService.checkUserIsLogIn();
  }

  getProductsAmount(productName: any): any {
    return localStorage.getItem(`${productName}_COUNT`);
  }

  calcTotalOrdersPrice(productsData: any) {
    for (let product of productsData) {
      let productName = product.productName;
      let productPrice = product.price;
      this.PRODUCT_AMOUNT = localStorage.getItem(`${productName}_COUNT`);
      this.totalOrders.push(productPrice * parseInt(this.PRODUCT_AMOUNT));
    }
  }

  getTotalOrders() {
    return this.totalOrders.reduce(function (preValue, postValue, currentValue) {
      return postValue + preValue ;
    }, 0);
  }

  cancelOrder(productName: any) {
    this.cartCount.pop();
    if (this.cartCount.length == 0) {
      localStorage.removeItem('ORDER_COUNT_IN_CART');
    } else {
      localStorage.setItem('ORDER_COUNT_IN_CART', this.cartCount);
    }
    window.location.reload();
    localStorage.removeItem(`${productName}_COUNT`);
    localStorage.removeItem(`${productName}_ID`);
  }

  navigateToShipping() {
    this.router.navigate(['/checkout'], {
      queryParams: {
        orders_amount: this.cartCount.length,
        products: JSON.stringify(this.productsData),
        subtotal: JSON.stringify(this.totalOrders)
      }
    });
  }

  getProductsOrderInfo(productsData: any) {
    for (let index = 0; index < productsData.length; index++) {
      this.productsOrderInfo.push({
        product: productsData[index],
        amount: localStorage.getItem(`${productsData[index].productName}_COUNT`),
        status: "ORDERED",
        ID_NO: index + 1,
        returnProductText: " "
      });
    }
  }

  async buyProductWithUserAuth() {
    if (!this.userIsAuthenticated) {
      this.router.navigateByUrl('/login');
      localStorage.setItem("previousUrl", "cart");
    } else {
      var userId = localStorage.getItem('user-id');
      (await this.userService.getUser(userId)).subscribe(userResponse => {
        this.userResponseApi = userResponse;
        this.user = this.userResponseApi.data;
      });
      if (!/[A-Za-z0-9]/.test(this.user.address) || !/[A-Za-z]/.test(this.user.city) || !/[A-Za-z]/.test(this.user.emarite)) {
        this.snackBar.open("Please add Your Address  Your Order is not Complete", "Close", {
          horizontalPosition: "end",
          verticalPosition: "bottom",
          panelClass: ['error'],
          duration: 3 * 1000
        });
        this.router.navigate([`/${localStorage.getItem("username")}/address`]);
        return
      } else if (!/\d/.test(this.user.phone) || this.user.phone == " ") {
        this.snackBar.open("Please add Your phone", "Close", {
          horizontalPosition: "end",
          verticalPosition: "bottom",
          panelClass: ['error'],
          duration: 3 * 1000
        });
        this.router.navigate([`/${localStorage.getItem("username")}/profile`]);
        return
      }
      const productsData = this.productsOrderInfo.map((productDetails) => {
        return productDetails;
      });
      let userData = {
        products: productsData,
        userId: localStorage.getItem("user-id"),
        amount: this.cartCount.length,
        subtotal: this.getTotalOrders(),
      };
      (await this.orderService.orderRequsetWithUserAuth(userData)).subscribe(response => {
        this.snackBar.openFromComponent(OrderCreatedMessageComponent, {
          data: this.user,
          horizontalPosition: "center",
          verticalPosition: "top",
          duration: 5 * 1000
        });
        for (let product of userData.products) {
          localStorage.removeItem(`${product.productName}_COUNT`);
          localStorage.removeItem(`${product.productName}_ID`);
        }
        localStorage.removeItem("previousUrl");
        localStorage.removeItem("ORDER_COUNT_IN_CART");
        setTimeout(() => {
          this.router.navigateByUrl("/");
        }, 5000);
      }, (error) => {
        this.snackBar.open(error.error.message, "OK", {
          duration: 3 * 1000,
          horizontalPosition: "end",
          verticalPosition: "bottom",
          panelClass: ['error']
        });
      });
    }
  }
}
