import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/API Services/Product/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  productInfo:any;
  productParams:any;
  updateProductApiResponse: any;
  imageUploaded!:File;
  addProductForm:FormGroup;
  constructor(private snackBar: MatSnackBar,
    private productService: ProductService, private route:ActivatedRoute,
    public router: Router , private formBuilder:FormBuilder) {
      this.addProductForm = this.formBuilder.group({
        productName: ['', [Validators.required]],
        description: ['', [Validators.required]],
        price: ['', [Validators.required]],
        brand: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.productParams = this.route.snapshot.queryParamMap.get("product");
    this.productInfo = JSON.parse(this.productParams);
    console.log(this.productInfo);
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
      this.imageUploaded = file;
  }

  validationNotificaion() {
    this.snackBar.open("Can't Update,fill your fieldes", "Close", {
      horizontalPosition: "end",
      verticalPosition: "bottom",
      duration: 4 * 1000,
      panelClass: ['error']
    });
  }


  async formSubmit(event: any) {
    if(!this.addProductForm.valid)
        this.validationNotificaion();
    else{
        let productName = (event.target.productName.value);
        let price = (event.target.price.value);
        let description = (event.target.description.value);
        let category = (event.target.category.value);
        let tag = (event.target.tag.value);
        let brand = (event.target.brand.value);
        const productData = new FormData();
        productData.append("description",description);
        productData.append("category",category);
        productData.append("tag",tag);
        productData.append("price",price);
        productData.append("brand",brand);
        productData.append("productName",productName);
        productData.append("image",this.imageUploaded);
        (await (this.productService.updateProducts(this.productInfo._id,productData))).subscribe(response=>{
          this.updateProductApiResponse = response;
          this.snackBar.open('Product updated successfully',"Ok",{
              horizontalPosition: "end",
              verticalPosition: "bottom",
              duration: 4 * 1000,
              panelClass: ['success']
          });
            document.location.reload();
            this.router.navigateByUrl('/dashboard/products');
        },(error)=>{
          this.snackBar.open(error.error.message,"Ok",{
            horizontalPosition: "end",
            verticalPosition: "bottom",
            duration: 4 * 1000,
            panelClass: ['success']
          });
        });
      }
  }

  CATEGORIES = ['ROUTERS', 'SWITCHES', 'CONTROLLERS', "HUB'S", "THERMOSTATES", "CAMERAS", "INTERCOM", " ACCESS POINTS"
    , "SOUND SYSTEM", " SLIDING DOOR", " GATE BARRIERS", " DOOR LOCKS"];

  TAGS = ["NETWORKING", "SMART HOME", "CCTV", "GATEWAYS"];

}
