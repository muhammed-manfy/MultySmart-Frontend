import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/API Services/Admin/admin-service.service';
import { UpdateBrandComponent } from '../UpdateData/update-brand/update-brand.component';
import { UpdateVideoComponent } from '../UpdateData/update-video/update-video.component';

@Component({
  selector: 'app-delievery-orders',
  templateUrl: './delievery-orders.component.html',
  styleUrls: ['./delievery-orders.component.scss']
})
export class DelieveryOrdersComponent implements OnInit {
  ordersApiResponse: any;
  ordersList: Array<any> = [];
  currentPage: number = 0;
  pageSize: number = 2;
  totalOrders: any;

  constructor(private adminService: AdminServiceService,
    public dialog: MatDialog, public router: Router) { }

  ngOnInit(): void {
    this.getOrders();
  }

  async getOrders() {
    (await this.adminService.getOrdersDeliveryStatus(this.currentPage, this.pageSize)).subscribe(orders => {
      this.ordersApiResponse = orders;
      this.ordersList = this.ordersApiResponse.data.map((order: any) => {
        return order;
      });
    });
  }

  handlePagination(event: PageEvent) {
    var pageNumber = event.pageIndex;
    this.currentPage = pageNumber;
    this.getOrders();
  }

  async viewUserData(orderData:any){
    const userId = orderData.userId;
    if (userId) {
      var user = await (await (this.adminService.getOrderUser(orderData.userId))).toPromise();
      this.dialog.open(UpdateBrandComponent, {
        data: {
          userInfo: user
        }
      });
    } else {
      this.dialog.open(UpdateVideoComponent, {
        data: orderData
      });
    }
  }
}
