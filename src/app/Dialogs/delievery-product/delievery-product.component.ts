import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/API Services/Admin/admin-service.service';

@Component({
  selector: 'app-delievery-product',
  templateUrl: './delievery-product.component.html',
  styleUrls: ['./delievery-product.component.scss']
})
export class DelieveryProductComponent implements OnInit {
  apiResponse: any;
  constructor(private adminSevice: AdminServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar, public router: Router) { }

  ngOnInit(): void {
  }
  async delieveryProduct(id_no: any, order_id: any) {
    (await this.adminSevice.updateProductsStatusToDelivered(id_no, order_id)).subscribe(response => {
      this.apiResponse = response;
      this.snackBar.open(this.apiResponse.message, "OK", {
        duration: 3 * 1000,
        horizontalPosition: "left",
        verticalPosition: "bottom",
        panelClass: ['success']
      });
      document.location.reload();
    }, (error) => {
      this.snackBar.open(error.error.messsage, "CLOSE", {
        duration: 3 * 1000,
        horizontalPosition: "left",
        verticalPosition: "bottom",
        panelClass: ['error']
      });
    })
  }

}
