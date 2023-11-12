import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/API Services/Product/product.service';
import { ShowProductNotificatoinsComponent } from 'src/app/ValidatorNotification/ValidatorProduct/show-product-notificatoins/show-product-notificatoins.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  apiResponse: any;
  imagesUploaded: any;

  constructor(private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private productService: ProductService) {

    this.addProductForm = this.formBuilder.group({
      productName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      image: ['', [Validators.required]]
    })
  }

  get productName() {
    return this.addProductForm.get('productName')?.valid;
  }
  get description() {
    return this.addProductForm.get('description')?.valid;
  }
  get brand() {
    return this.addProductForm.get('brand')?.valid;
  }
  get price() {
    return this.addProductForm.get('price')?.valid;
  }
  get image() {
    return this.addProductForm.get('image')?.valid;
  }

  ngOnInit(): void {
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    this.imagesUploaded = file;
  }

  validationNotificaion() {
    this.snackBar.openFromComponent(ShowProductNotificatoinsComponent, {
      data: {
        productName: this.productName,
        description: this.description,
        price: this.price,
        image: this.image,
        brand: this.brand,
      },
      horizontalPosition: "end",
      verticalPosition: "bottom",
      duration: 3 * 1000
    })
  }

  async submitProduct(event: any) {
    if (!this.addProductForm.valid) {
      this.validationNotificaion();
    }
    else {
      let productName = this.addProductForm.value.productName;
      let price = this.addProductForm.value.price;
      let tag = event.target.tag.value;
      let description = this.addProductForm.value.description;
      let brand = event.target.brand.value;
      let category = event.target.category.value;
      const productData = new FormData();
      productData.append("productName", productName);
      productData.append("price", price);
      productData.append("description", description);
      productData.append("brand", brand);
      productData.append("tag", tag);
      productData.append("category", category);
      productData.append("image", this.imagesUploaded);
      (await this.productService.createProduct(productData)).subscribe(response => {
        this.apiResponse = response;
        this.snackBar.open(this.apiResponse.message, "Ok", {
          horizontalPosition: "end",
          verticalPosition: "bottom",
          duration: 3 * 1000,
          panelClass: ['success']
        });
      }, (error) => {
        this.snackBar.open(error.error.message, "Ok", {
          horizontalPosition: "end",
          verticalPosition: "bottom",
          duration: 3 * 1000,
          panelClass: ['error']
        });
      });
    }
  }

  CATEGORIES = ['ROUTERS', 'SWITCHES', 'CONTROLLERS', "HUB'S", "THERMOSTATES", "CAMERAS", "INTERCOM", " ACCESS POINTS"
    , "SOUND SYSTEM", " SLIDING DOOR", " GATE BARRIERS", " DOOR LOCKS"];

  TAGS = ["NETWORKING", "SMART HOME", "CCTV", "GATEWAYS"];

}






