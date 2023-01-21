import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { ProductService } from '../API Services/Product/product.service';
import { productInfo } from '../Models/Product.model';
import { ProductsComponent } from '../products/products.component';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  id:any;
  dataProduct:any;
  constructor(public route:ActivatedRoute,
    private productService:ProductService) {
    $(document).ready(function(){
      $(".product-speceifcation > p").hide();
    })
    $(document).ready(function(){
      $(".product-description-toggle").click(function(){
        $("#product-description-toggle").toggle(300);
      });
    })
    $(document).ready(function(){
      $(".product-features-toggle").click(function(){
        $("#product-features-toggle").toggle(300);
      });
    })
  }

  async ngOnInit():Promise<void> {
    this.id = this.route.snapshot.paramMap.get("id");
    (await this.productService.getProductInfo(this.id)).subscribe((product)=>{
      this.dataProduct = product;
    });
  }
	ratingProduct = new FormControl<number | null>(null, Validators.required);

	toggle() {
		if (this.ratingProduct.disabled) {
			this.ratingProduct.enable();
		} else {
			this.ratingProduct.disable();
		}
	}
}
