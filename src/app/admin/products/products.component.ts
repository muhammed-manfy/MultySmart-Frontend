import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/API Services/Product/product.service';
import { DeleteProductComponent } from 'src/app/Dialogs/Products/delete-product/delete-product.component';
import { productInfo } from 'src/app/Models/Product.model';

@Component({
  selector: 'app-admin-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  productsReceived :any;
  productsList = Array <productInfo>();

  constructor(private productService:ProductService
    ,public dialog:MatDialog
    ,public router:Router) { }
  async ngOnInit():Promise <void> {
     (await this.productService.getProducts()).subscribe((products:productInfo)=>{
      this.productsReceived = products;
      this.productsList = this.productsReceived.map((product:any)=>{
        return product;
      });
    });
  }

  deleteProduct(id:any){
    this.dialog.open(DeleteProductComponent,{
      data:{
        id:id
      },
      width:"300px"
    })
  }
  editProduct(product:any){
    this.router.navigateByUrl('dashboard/edit-product',{state:product});
  }
}
