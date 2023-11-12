import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/API Services/Product/product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit {

  deleteProductApiResponse: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public snackBar: MatSnackBar,
    private productService: ProductService) { }

  ngOnInit(): void {
  }
  
  async deleteRecord(id: any) {
    (await this.productService.deleteProducts(id)).subscribe(response => {
      this.deleteProductApiResponse = response;
      this.snackBar.open(this.deleteProductApiResponse.message, "Ok", {
        horizontalPosition: "end",
        verticalPosition: "bottom",
        duration: 4 * 1000,
        panelClass: ['success']
      });
      window.location.reload();
    }, (error) => {
      this.snackBar.open(error.error.message, "Ok", {
        horizontalPosition: "end",
        verticalPosition: "bottom",
        duration: 4 * 1000,
        panelClass: ['error']
      });
    });
  }
}
