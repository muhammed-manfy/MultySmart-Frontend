import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminServiceService } from 'src/app/API Services/Admin/admin-service.service';
import { OrderServiceService } from 'src/app/API Services/Order/order-service.service';
import { UserServiceService } from 'src/app/API Services/User/user-service.service';
import { Order } from 'src/app/Models/Order.model';
import { productInfo } from 'src/app/Models/Product.model';

@Component({
  selector: 'app-return-dialog',
  templateUrl: './return-dialog.component.html',
  styleUrls: ['./return-dialog.component.scss']
})
export class ReturnDialogComponent implements OnInit {
  userId = localStorage.getItem('user-id');
  userInfo: any;
  userOrdersInfo: Array<any> = [];
  productReturn: Array<any> = [];
  productSelected: Array<any> = [];
  reasonReturn: Array<any> = [];
  canceledProductApiResponse: any;

  constructor(private _formBuilder: FormBuilder, private orderService: OrderServiceService,
    private snackBar: MatSnackBar, private userService: UserServiceService) { }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  async ngOnInit(): Promise<void> {
    (await (this.orderService.getUserOrdersToCanceled(this.userId))).subscribe(userOrders => {
      this.userInfo = userOrders;
      this.userOrdersInfo = this.userInfo.data.map((order: any) => { return order });
    });
  }

  selectProduct(product_id_no: any, order_id: any) {

    this.productReturn = this.productSelected.filter(product => {
      return product.product_id_no == product_id_no && product.order_id == order_id;
    });

    if (this.productReturn.length == 0) {
      this.productSelected.push({ product_id_no, order_id });
    }
  }

  selectReason(value: any) {

    if (this.reasonReturn.includes(value)) {
      const selectedReasons = this.reasonReturn.filter(text => {
        return text !== value;
      });
      this.reasonReturn = selectedReasons;
    }
    else {
      this.reasonReturn.push(value);
    }
  }

  validationNotification(): boolean {
    if (this.productSelected.length == 0) {
      this.snackBar.open("Please select a product", "Close", {
        duration: 3 * 1000,
        horizontalPosition: "center",
        verticalPosition: "bottom",
      });
      return false;
    } else if (this.reasonReturn.length == 0) {
      this.snackBar.open("Please select a resaon", "Close", {
        duration: 3 * 1000,
        horizontalPosition: "center",
        verticalPosition: "bottom",
      });
      return false;
    }
    return true
  }

  async orderCanceled() {
    if (this.productSelected.length == 0 || this.reasonReturn.length == 0 ) {
      this.validationNotification();
    }else {
      const productsIds = this.productSelected.map((productData: any) => { return productData.product_id_no });
      const ordersIds = this.productSelected.map((ordersData: any) => { return ordersData.order_id });

      (await this.userService.updateProductsStatusToCanceled(productsIds, ordersIds, this.reasonReturn)).subscribe(response => {
        this.canceledProductApiResponse = response;
        this.snackBar.open("Product Canceled successfully!", "Ok", {
          duration: 3 * 1000,
          horizontalPosition: "center",
          verticalPosition: "bottom",
          panelClass: ['success']
        });
        document.location.reload();
      }, (error) => {
        this.snackBar.open(error.error.message, "Close", {
          duration: 3 * 1000,
          horizontalPosition: "center",
          verticalPosition: "bottom",
          panelClass: ['error']
        });
      });
    }// end of canceled an order api
  }

  REASONS_TO_RETURN_A_PRODUCT = ['lower quality product', 'expenisve a price product', 'not working product', 'not desirable product', 'other resaons'];
}
