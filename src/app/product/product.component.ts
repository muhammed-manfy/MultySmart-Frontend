import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { ProductService } from '../API Services/Product/product.service';
import {Comment} from '../Models/Comment.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  PRODUCT_ID: any;
  productInfo:any;
  productApiResponse: any;
  productCounter: number = 1;
  commentProductForm!: FormGroup;
  commentApiResponse: any;
  commentsProductApiResponse: any;
  commentsProductList:Array<Comment>=[];
  currentPage: number = 0;
  pageSize:number = 6;
  totalComments:any;
  products:Array<any>=[];
  constructor(public route: ActivatedRoute, private productService: ProductService,
    private router: Router, private snackBar: MatSnackBar, private formBuilder: FormBuilder) {
    this.commentProductForm = this.formBuilder.group({
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'comment': ['', [Validators.required]]
    });
  }
  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(params => {
      this.PRODUCT_ID = params['id'];
    });
    (await this.productService.getProductInfo(this.PRODUCT_ID)).subscribe(product => {
      this.productApiResponse = product;
      this.productInfo = this.productApiResponse.data;
    });
    this.getProductComments();
  }

  backToShop(){
    this.router.navigateByUrl('/shop');
  }

  async getProductComments(){
    (await this.productService.getProductComment(this.PRODUCT_ID,this.currentPage,this.pageSize)).subscribe(comments=>{
      this.commentApiResponse = comments;
      this.commentsProductList = this.commentApiResponse.data.map((comment:any) =>{return comment;});
    });
  }

  paginationHandle(event:any){
    var pageNumber = event;
    this.currentPage = pageNumber;
    this.getProductComments();
  }

  productCountCalcIncrease(product: number): void {
    this.productCounter += 1;
  }

  productCountCalcDecrease(product: number): void {
    this.productCounter > 1 ? this.productCounter -= 1 : this.productCounter = 1;
  }

  addToCartPage () {
    let PRODUCT_NAME = this.productInfo.productName;
    let PRODUCT_ID = this.productInfo._id;
    let PRODUCT_AMOUNT = this.productCounter.toString();

    var cartInfo = localStorage.getItem("ORDER_COUNT_IN_CART");
    var cartProducts = [];
    if(cartInfo == null) {
      cartProducts.push(PRODUCT_ID);
      localStorage.setItem("ORDER_COUNT_IN_CART",JSON.stringify(cartProducts));
      localStorage.setItem(`${PRODUCT_NAME}_COUNT`,PRODUCT_AMOUNT);
      localStorage.setItem(`${PRODUCT_NAME}_ID`,PRODUCT_ID);
      this.router.navigateByUrl('/cart');
    }else {
      var cartData = JSON.parse(cartInfo);
      if(cartData.includes(PRODUCT_ID)){
        this.snackBar.open("A product is added to your cart","Close",{
          duration:3 * 1000,
          horizontalPosition:"center",
          verticalPosition:"bottom"
        });
        this.router.navigateByUrl('/cart');
        return
      }
      cartProducts.push(PRODUCT_ID);
      var products = cartProducts.concat(cartData);
      localStorage.setItem("ORDER_COUNT_IN_CART",JSON.stringify(products));
      localStorage.setItem(`${PRODUCT_NAME}_COUNT`,PRODUCT_AMOUNT);
      localStorage.setItem(`${PRODUCT_NAME}_ID`,PRODUCT_ID);
      this.router.navigateByUrl('/cart');
    }
  }


  async createProductComment() {
    if (!this.commentProductForm.valid) {
      this.snackBar.open("Please Fill All Fields", "Close", {
        duration: 3 * 1000,
        horizontalPosition: "left",
        verticalPosition: "bottom"
      });
    } else {
      const commentData = {
        username: this.commentProductForm.get('firstName')?.value +' '+this.commentProductForm.get('lastName')?.value,
        comment: this.commentProductForm.get('comment')?.value,
        product_id: this.PRODUCT_ID
      };
      (await this.productService.createProductComment(commentData)).subscribe(response => {
        this.commentApiResponse = response;
        this.snackBar.open(this.commentApiResponse.message, "Ok", {
          duration: 3 * 1000,
          horizontalPosition: "left",
          verticalPosition: "bottom",
          panelClass: ["success"]
        });
        document.location.reload();
      }, (error) => {
        this.snackBar.open(error.error.message, "Ok", {
          duration: 3 * 1000,
          horizontalPosition: "left",
          verticalPosition: "bottom",
          panelClass: ['error']
        });
      });
    }
  }
}


// var COUNT_ORDERS = localStorage.getItem('ORDER_COUNT_IN_CART');
//     let idIsExist = COUNT_ORDERS?.includes(PRODUCT_ID);
//     var ORDERs_COUNT_IN_CART = [];
//     if (COUNT_ORDERS == null) {
//         ORDERs_COUNT_IN_CART.push(PRODUCT_ID);
//       } else {
//       if (idIsExist) {
//         this.snackBar.open('You already added this product to Cart', "Ok", {
//           duration: 3 * 1000,
//           horizontalPosition: "end",
//           verticalPosition: "bottom",
//         });
//         this.router.navigateByUrl("/cart");
//         return ;
//       }
//         ORDERs_COUNT_IN_CART.push(PRODUCT_ID);
        // this.products = JSON.parse(COUNT_ORDERS);
        // this.products.concat(ORDERs_COUNT_IN_CART);
        // console.log(ORDERs_COUNT_IN_CART);
        // localStorage.setItem('ORDER_COUNT_IN_CART', JSON.stringify(this.products));
    // }
    // this.router.navigateByUrl('/cart');
    // localStorage.setItem(`${PRODUCT_NAME}_ID`, PRODUCT_ID);
    // localStorage.setItem(`${PRODUCT_NAME}_COUNT`, PRODUCT_AMOUNT);
