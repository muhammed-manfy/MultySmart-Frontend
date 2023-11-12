import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { OrderServiceService } from 'src/app/API Services/Order/order-service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  userId: any = localStorage.getItem('user-id');
  ordersInfo: Array<any>=[];
  productsInfo: Array<any>=[];
  orderApiResponse:any;
  productsApiResponse: any;
  username:any;
  currentPage:number =0;
  pageSize:number = 2;
  totalOrders:any;
  constructor(private router:Router, private orderService: OrderServiceService) { }

  ngOnInit(): void {
    this.getOrders();
    this.username = localStorage.getItem('username');
  }

  async getOrders() {
    (await this.orderService.getUserOrders(this.userId,this.currentPage,this.pageSize)).subscribe((orders: any) => {
      this.orderApiResponse  = orders;
      this.ordersInfo = this.orderApiResponse.data;
      this.totalOrders = this.orderApiResponse.totalOrders;
    });
  }
  productDetailsNavigate(product:any , order:any) {
    const productData = product;
    const orderData = order;
    this.router.navigate([`/+${this.username}+/product-details`],{
      queryParams:{
        product: JSON.stringify(productData),
        order: JSON.stringify(orderData)
      }
    });
  }
  handlePagination(event:PageEvent){
    var pageNumber = event.pageIndex;
    this.currentPage = pageNumber;
    this.getOrders();
  }
}
