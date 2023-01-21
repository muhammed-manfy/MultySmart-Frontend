import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BrandService } from '../API Services/Brand/brand.service';
import { ProductService } from '../API Services/Product/product.service';
import { brandInfo } from '../Models/Brand.model';
import { productInfo } from '../Models/Product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  pageSize = 2;
  currentPage = 0;
  category :any;
  brand :any;
  searchFiled:any;
  totalProducts:any;
  categoriesReceived:any;
  categoriesList = Array();
  brandsReceived:any;
  brandsList = Array<brandInfo>();
  productsReceived:any;
  productsList = Array<productInfo>();
  constructor(private productService:ProductService,
    private brandService:BrandService,
    public router : Router) { }
    showFiller = false;
  async ngOnInit():Promise<void> {
    this.getCategories();
    this.getBrands();
    this.productsDisplay();
  }
  getCategories(){
    this.productService.getCategories().subscribe(allCategories=>{
      this.categoriesReceived = allCategories;
      this.categoriesList = this.categoriesReceived.map((category:any)=>{
        return category;
      });
    });
  }

  getBrands(){
    this.brandService.getBrands().subscribe(allBrands=>{
      this.brandsReceived = allBrands;
      this.brandsList = this.brandsReceived.map((brand:any)=>{
        return brand;
      });
    });
  }

  async productsDisplay(){
    (await this.productService.productsDisplay(this.category,this.brand,this.pageSize,this.currentPage)).subscribe((products:productInfo)=>{
      this.productsReceived = products;
      this.productsList = this.productsReceived.products.map((product:any)=>{
        return product;
;      });
      this.totalProducts = this.productsReceived.totalProducts;
    });
  }

  selectCategory(value:any){
    this.category = value;
    this.brand = '';
    this.productsDisplay();
  }
  selectBrand(value:any){
    this.brand=value;
    this.category= '';
    this.productsDisplay();
  }
  paginationHandle(pageNumber:any){
    this.currentPage = pageNumber;
    this.productsDisplay();
  }
  navigationProduct(product:any){
    this.router.navigate(['/product/',product._id]);
  }
}
