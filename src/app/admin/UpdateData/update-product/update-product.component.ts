import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/API Services/Product/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  idProduct: any;
  routingInfo: any;
  featuresItem = Array<any>();
  verifyOfItems: Number = 0;
  featuresValid: Boolean = true;
  messageResponse: any;
  imagesUploaded = Array<File>();
  constructor(private snackBar: MatSnackBar,
    private productService: ProductService,
    public router: Router) {
    this.routingInfo = this.router.getCurrentNavigation()?.extras.state;
    this.idProduct = this.routingInfo._id;
    this.featuresItem = this.routingInfo.features;
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

  uploadImages(event: any) {
    const files = event.target.files;
    for (let index = 0; index < files.length; index++) {
      this.imagesUploaded.push(files[index]);
    }
  }

  validationNotificaion() {
    this.snackBar.open("Can't Update Data", "Close", {
      horizontalPosition: "end",
      verticalPosition: "bottom",
      duration: 4 * 1000,
      panelClass: ['validationSnackBar']
    })
  }


  async formSubmit(event: any) {

    let productName = (event.target.productName.value);
    let price = (event.target.price.value);
    let savePrice = (event.target.savePrice.value) || 0;
    let description = (event.target.description.value);
    let category = (event.target.category.value);
    let brand = (event.target.brand.value);

    if (!productName || !price || !description || !category || !brand
      || this.imagesUploaded.length == 0 || this.featuresItem.length == 0)
      this.validationNotificaion();
    else {
      let image; let feature;
      const productupdate = new FormData();
      productupdate.append("productName", productName);
      productupdate.append("price", price);
      productupdate.append("savePrice", savePrice);
      productupdate.append("description", description);
      productupdate.append("brand", brand);
      productupdate.append("category", category);
      for (let index = 0; index < this.imagesUploaded.length; index++) {
        image = this.imagesUploaded[index];
        productupdate.append("images", image);
      }
      for (let index = 0; index < this.featuresItem.length; index++) {
        feature = this.featuresItem[index];
        productupdate.append("features", feature);
      }
      (await this.productService.updateProducts(this.idProduct, productupdate)).subscribe(response => {
        this.messageResponse = response;
        this.snackBar.open(this.messageResponse.message, "Ok", {
          horizontalPosition: "end",
          verticalPosition: "bottom",
          duration: 4 * 1000,
          panelClass: ['successSnackBar']
        });
        this.router.navigate(['dashboard/products']);
      }, (err) => {
        this.snackBar.open("Some thing error is happend please try later!", "Ok", {
          horizontalPosition: "end",
          verticalPosition: "bottom",
          duration: 4 * 1000,
          panelClass: ['validationSnackBar']
        });
      });
    }
  }
}
