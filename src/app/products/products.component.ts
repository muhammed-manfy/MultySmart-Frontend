import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BrandService } from '../API Services/Brand/brand.service';
import { ProductService } from '../API Services/Product/product.service';
import { productInfo } from '../Models/Product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  pageSize = 9;
  currentPage = 0;
  category: any;
  brand: any;
  tag:any;
  searchFiled: any;
  productName: string = '';
  totalProducts: any;
  categoriesReceived: any;
  categoriesList = Array();
  brandsReceived: any;
  productsReceived: any;
  productsList = Array<productInfo>();
  searchText:any=""
  @Output() productSelected = new EventEmitter<any>();
  GATEGORIES = ['ALL PRODUCTS', 'ROUTERS', 'SWITCHES', 'CONTROLLERS', "HUB'S", "THERMOSTATES", "CAMERAS", "INTERCOM", " ACCESS POINTS"
    , "SOUND SYSTEM", " SLIDING DOOR", " GATE BARRIERS", " DOOR LOCKS"];
  TAGS = ["ALL","NETWORKING", "SMART HOME", "CCTV", "GATEWAYS"];
  showFiller = false;
  screenWidth!: number ;
  constructor(private productService: ProductService,
    public router: Router) {
      this.screenWidth = window.innerWidth;
     }

  async ngOnInit(): Promise<void> {
    this.productsDisplay();
    console.log(this.screenWidth);
  }

  async productsDisplay() {
    (await this.productService.productsDisplay(this.category ,this.brand ,this.tag ,this.pageSize ,this.currentPage)).subscribe((products: productInfo) => {
      this.productsReceived = products;
      this.productsList = this.productsReceived.products.map((product: productInfo) => {
        return product;
      });
      this.totalProducts = this.productsReceived.totalProducts;
    });
  }

  selectCategory(value: any) {
    if( value == 'ALL PRODUCTS')
    this.category = '';
    else{
      this.category = value;
    }
    this.productsDisplay();
  }


  selectBrand(value: any) {
    this.brand = value;
    this.productsDisplay();
  }

  selectTag(value: any) {
    if(value == "ALL")
    this.tag = '';
    else
    this.tag = value;

    this.productsDisplay();
  }

  paginationHandle(pageNumber: any) {
    this.currentPage = pageNumber;
    this.productsDisplay();
  }


  navigateToProduct(product: any) {
    let PRODUCT_ID = product._id;
    let PRODUCT_NAME: string = product.productName;
    let productWords = [];
    productWords = PRODUCT_NAME.split(' ');
    this.productName = productWords.join('');
    this.router.navigate(["/product/" + this.productName], {
      queryParams: {
        id: PRODUCT_ID
      }
    });
  }
  searchFilter(value:any){
    this.searchText = value;
  }
}
