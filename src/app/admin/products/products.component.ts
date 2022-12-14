import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/API Services/Product/product.service';
import { productInfo } from 'src/app/Models/Product.model';

@Component({
  selector: 'app-admin-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  productsReceived :any;
  productsList = Array <productInfo>();

  constructor(private productService:ProductService) { }
  async ngOnInit():Promise <void> {
     (await this.productService.getProducts()).subscribe((products:productInfo)=>{
      this.productsReceived = products;
      this.productsList = this.productsReceived.map((product:any)=>{
        return product;
      });
      console.log(this.productsList)
    })
  }
}
