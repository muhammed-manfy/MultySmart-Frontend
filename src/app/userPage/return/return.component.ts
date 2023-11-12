import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReturnDialogComponent } from '../Dialogs/return-dialog/return-dialog.component';
import { UserServiceService } from 'src/app/API Services/User/user-service.service';
import { OrderServiceService } from 'src/app/API Services/Order/order-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { Order } from 'src/app/Models/Order.model';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit {

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar
    , private userService: UserServiceService, private orderService: OrderServiceService) { }
  userCanceledOrders: Array<any> = [];
  userOrdersApiResponse: any;
  productsOrdersApiResponse: any;
  checkOrders: boolean = true;
  currentPage: number = 0;
  pageSize: number = 1;
  totalOrders: any;
  async ngOnInit(): Promise<void> {
    this.getCanceldOrders();
    this.getOrdersToCanceled();
  }

  async getCanceldOrders() {
    (await this.userService.getCanceledProductsStatus(this.currentPage, this.pageSize)).subscribe(userRespnse => {
      this.userOrdersApiResponse = userRespnse;
      this.userCanceledOrders = this.userOrdersApiResponse.data.map((user: any) => { return user; });
      this.totalOrders = this.userOrdersApiResponse.totalOrders;
    });
  }

  async getOrdersToCanceled() {
    var user_id = localStorage.getItem('user-id');
    (await this.orderService.getUserOrdersToCanceled(user_id)).subscribe(products => {
      this.productsOrdersApiResponse = products;
      if (this.productsOrdersApiResponse.data.length == 0) {
        this.checkOrders = false;
      }
    });
  }


  handlePagination(event: PageEvent) {
    var pageNumber = event.pageIndex;
    this.currentPage = pageNumber;
    this.getCanceldOrders();
  }

  public openDialog(): void {
    if (this.checkOrders == false) {
      this.snackBar.open("You don't have any order", "Close", {
        duration: 3 * 1000,
        horizontalPosition: "left",
        verticalPosition: "bottom",
        panelClass: ['error']
      });
    } else
      this.dialog.open(ReturnDialogComponent);
  }
}
