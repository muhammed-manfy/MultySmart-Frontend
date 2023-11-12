import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { AdminServiceService } from 'src/app/API Services/Admin/admin-service.service';

@Component({
  selector: 'app-accept-order',
  templateUrl: './accept-order.component.html',
  styleUrls: ['./accept-order.component.scss']
})
export class AcceptOrderComponent implements OnInit {
  productApiResponse: any;
  constructor(private adminSevice: AdminServiceService,
    @Inject(MAT_DIALOG_DATA)public data:any,
    public snackBar: MatSnackBar,public router:Router) { }

  ngOnInit(): void {
  }

  async shippingOrder(product_no: any, order_id:any) {
    (await this.adminSevice.updateProductOrderStatusToShipping(product_no,order_id)).subscribe(response => {
      this.productApiResponse = response;
      this.snackBar.open(this.productApiResponse.message, "OK", {
        duration: 3 * 1000,
        horizontalPosition: 'left',
        verticalPosition: "bottom",
        panelClass: ['success']
      });
      window.location.reload();
      this.router.navigateByUrl('/dashboard/orders');
    }, (error) => {
      this.snackBar.open(error.error.message, "CLOSE", {
        duration: 3 * 1000,
        horizontalPosition: 'left',
        verticalPosition: "bottom",
        panelClass: ['error']
      });
    })
  }
}
