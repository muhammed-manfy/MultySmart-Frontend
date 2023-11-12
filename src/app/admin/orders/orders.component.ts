import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/API Services/Admin/admin-service.service';
import { DeleteOfferComponent } from 'src/app/Dialogs/Offers/delete-offer/delete-offer.component';
import { DelieveryProductComponent } from 'src/app/Dialogs/delievery-product/delievery-product.component';
import { UpdateVideoComponent } from '../UpdateData/update-video/update-video.component';
import { UpdateBrandComponent } from '../UpdateData/update-brand/update-brand.component';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersAdminComponent implements OnInit {
  ordersApiResponse: any;
  ordersList: Array<any> = [];
  currentPage: number = 0;
  pageSize: number = 2;
  totalOrders:any;
  constructor(private adminService: AdminServiceService,
    public dialog: MatDialog, public router: Router) { }

  ngOnInit():void {
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
  
  async getOrders(){
    (await this.adminService.getOrdersShippingStatus(this.currentPage,this.pageSize)).subscribe(orders => {
      this.ordersApiResponse = orders;
      this.ordersList = this.ordersApiResponse.data.map((order: any) => {
        return order;
      });
      this.totalOrders = this.ordersApiResponse.totalOrders;
    });
  }



  handlePagination(event:PageEvent){
    var pageNumber = event.pageIndex;
    this.currentPage   = pageNumber;
    this.getOrders();
  }

  updateProductStatusToDeleveriy(product_no: any, order_id: any) {
    this.dialog.open(DelieveryProductComponent, {
      data:{
          id_no: product_no,
          order_id: order_id
      },
      width:"300px"
    });
  }

  deleteOffer(id: any) {
    this.dialog.open(DeleteOfferComponent, {
      data: {
        id: id
      },width: "300px"
    });
  }

}
