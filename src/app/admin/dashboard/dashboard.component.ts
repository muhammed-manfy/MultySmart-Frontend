import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router, RouterState } from '@angular/router';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import { AdminServiceService } from 'src/app/API Services/Admin/admin-service.service';
import { AcceptOrderComponent } from 'src/app/Dialogs/accept-order/accept-order.component';
import { Order } from 'src/app/Models/Order.model';
import { UserPageComponent } from 'src/app/userPage/user-page/user-page.component';
import { UpdateBrandComponent } from '../UpdateData/update-brand/update-brand.component';
import { PageEvent } from '@angular/material/paginator';
import { UpdateVideoComponent } from '../UpdateData/update-video/update-video.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public url: any;
  orderApiResponse: any;
  ordersList: Array<any> = [];
  userDataApiResponse: any;
  userInfo: any;
  currentPage: number = 0;
  pageSize: number = 2;
  totalOrders: any;

  constructor(private route: Router, private router: ActivatedRoute, private dialog: MatDialog,
    private adminService: AdminServiceService,
    public snackbar: MatSnackBar) {
    $(document).ready(function () {
      $("ul").hide();
    });

    $(document).ready(function () {
      $(".projects").click(function () {
        $(".projects-list").toggle(500);
      });
    });

    $(document).ready(function () {
      $(".product").click(function () {
        $(".product-list").toggle(500);
      });
    });
  }

  async ngOnInit(): Promise<void> {
    this.url = this.route.url;
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
    this.getOrders();
  }

  async getOrders() {
    (await this.adminService.getOrdersRequests(this.currentPage, this.pageSize)).subscribe(orders => {
      this.orderApiResponse = orders;
      this.ordersList = this.orderApiResponse.data.map((order: any) => {
        return order;
      });
      this.totalOrders = this.orderApiResponse.totalOrders;
    });
  }

  changeStatus(product_no: any, order_id: any) {
    this.dialog.open(AcceptOrderComponent, {
      data: {
        id_no: product_no,
        order_id: order_id
      }
    });
  }

  async viewUserData(orderData: any) {
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

  handlePagination(event: PageEvent) {
    var pageNumber = event.pageIndex;
    this.currentPage = pageNumber;
    this.getOrders();
  }

  logoutAdmin() {
    this.adminService.logoutAdmin();
  }
}
