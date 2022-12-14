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
  public addProductForm: FormGroup;
  public featuresItem = Array<any>();
  verifyOfItems: Number = 0;
  featuresValid: Boolean = true;
  messageResponse: any;
  imagesUploaded=Array<File>();
  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar , private productService:ProductService) {
    this.addProductForm = this.formBuilder.group({
      productName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      features: ['', [Validators.required]],
      category: ['', [Validators.required]],
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
  get price() {
    return this.addProductForm.get('price')?.valid;
  }
  get features() {
    return this.addProductForm.get('features')?.valid;
  }
  get category() {
    return this.addProductForm.get('category')?.valid;
  }
  get brand() {
    return this.addProductForm.get('brand')?.valid;
  }
  get image() {
    return this.addProductForm.get('image')?.valid;
  }

  ngOnInit(): void {
  }

  addItem(value: any) {
    if (value === '') {
      this.verifyOfItems = +1;
    }
    else {
      this.featuresItem.push(value);
      this.verifyOfItems = 0;
    }
  }
  removeItem(index: any) {
    this.featuresItem.splice(index, 1);
    console.log(this.featuresItem.length)
  }

  uploadImages(event:any){
    const files = event.target.files;
    for(let index = 0 ; index < files.length ;index++){
      this.imagesUploaded.push(files[index]);
    }
  }

  validationNotificaion() {
    this.snackBar.openFromComponent(ShowProductNotificatoinsComponent, {
      data: {
        productName: this.productName,
        description: this.description,
        price: this.price,
        features: this.features,
        category:this.category,
        brand:this.brand,
        imageUrl: this.image,
        featuresValid:this.featuresValid
      },
      horizontalPosition: "end",
      verticalPosition: "bottom",
      duration: 4 * 1000
    })
  }


  async formSubmit(event:any) {
    if (!this.addProductForm.valid || this.featuresValid == false)
      this.validationNotificaion();
    else {

        let productName = this.addProductForm.value.productName;
        let price =this.addProductForm.value.price;
        let savePrice = (event.target.savePrice.value)
        let description = this.addProductForm.value.description;
        let brand = this.addProductForm.value.brand;
        let category = this.addProductForm.value.category;
        let image; let feature;
        const productData = new FormData();
        productData.append("productName",productName);
        productData.append("price",price);
        productData.append("savePrice",savePrice);
        productData.append("description",description);
        productData.append("brand",brand);
        productData.append("category",category);
        for (let index = 0 ; index < this.imagesUploaded.length ; index++){
          image = this.imagesUploaded[index];
          productData.append("images",image);
        }
        for (let index = 0 ; index < this.featuresItem.length ; index++){
          feature = this.featuresItem[index];
          productData.append("features",feature);
        }
        await (await this.productService.createProduct(productData)).subscribe(response =>{
          this.messageResponse = response;
          this.snackBar.open(this.messageResponse.message,"Ok",{
            horizontalPosition: "end",
            verticalPosition: "bottom",
            duration: 4 * 1000,
            panelClass:['successSnackBar']
          });
        },(err)=>{
          this.snackBar.open("Some thing error is happend please try later!","Ok",{
            horizontalPosition: "end",
            verticalPosition: "bottom",
            duration: 4 * 1000,
            panelClass:['validationSnackBar']
        });
      });
    }
  }
}
