import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
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
  totalProducts:any;
  pageSize = 6;
  currentPage = 0;
  productsReceived :any;
  productsList = Array <productInfo>();
  pageEvent!:PageEvent
  constructor(private productService:ProductService
    ,public dialog:MatDialog
    ,public router:Router) { }

    ngOnInit(): void {
      this.getProductsPagination(this.pageSize,this.currentPage);
  }

  async getProductsPagination(pageSize:Number,currentPage:Number){
    (await this.productService.getProductsPagination(pageSize,currentPage)).subscribe((products:productInfo)=>{
      this.productsReceived = products;
      this.productsList = this.productsReceived.products.map((product:any)=>{
        return product;
      });
      this.totalProducts = this.productsReceived.totalProducts;
    });
  }
  handlePagination(event:PageEvent){
    this.pageEvent = event;
    this.getProductsPagination(event.pageSize,event.pageIndex);
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
