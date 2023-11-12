import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/API Services/Admin/admin-service.service';

@Component({
  selector: 'app-canceled-orderss',
  templateUrl: './canceled-orderss.component.html',
  styleUrls: ['./canceled-orderss.component.scss']
})
export class CanceledOrderssComponent implements OnInit {
  ordersApiResponse: any;
  ordersList: Array<any> = [];
  currentPage:number = 0;
  pageSize:number =2;
  totalOrders:any;
  constructor(private adminService: AdminServiceService,
    public dialog: MatDialog, public router: Router) { }

  ngOnInit():void {
    this.getOrders();
  }

  async getOrders(){
    (await this.adminService.getOrdersCanceledStatus(this.currentPage,this.pageSize)).subscribe(orders => {
      this.ordersApiResponse = orders;
      this.ordersList = this.ordersApiResponse.data.map((order: any) => {
        return order;
      });
      this.totalOrders= this.ordersApiResponse.totalOrders;
    });
  }

  handlePagination(event:PageEvent) {
    var pageNumber = event.pageIndex;
    this.currentPage = pageNumber;
    this.getOrders();
  }

}
