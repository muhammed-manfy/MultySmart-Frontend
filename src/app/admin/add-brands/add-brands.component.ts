import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { bottom, end } from '@popperjs/core';
import { BrandService } from 'src/app/API Services/Brand/brand.service';
import { brandInfo } from 'src/app/Models/Brand.model';

@Component({
  selector: 'app-add-brands',
  templateUrl: './add-brands.component.html',
  styleUrls: ['./add-brands.component.scss']
})
export class AddBrandsComponent implements OnInit {
  addBrand: FormGroup;
  brand: brandInfo | undefined;
  messageResponse: any;
  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, private brandService: BrandService) {
    this.addBrand = this.formBuilder.group({
      brandName: ['', [Validators.required]]
    })
  }
  get brandName() {
    return this.addBrand.get('brandName')?.valid;
  }
  ngOnInit(): void {
  }

  ValidationNotification() {
    this.snackBar.open("The brand is required", "Ok", {
      horizontalPosition: end,
      verticalPosition: bottom,
      duration: 4 * 1000,
      panelClass: ['validationSnackBar']
    });
  }
  async formSubmit() {
    if (!this.addBrand.valid)
      this.ValidationNotification();
    else {
      let brand = this.addBrand.value.brand;
      const formData = new FormData();
      formData.append("brand",brand);
      (await this.brandService.createBrand(formData)).subscribe(response => {
        this.messageResponse = response;
        this.snackBar.open(this.messageResponse.message, "Ok", {
          horizontalPosition: end,
          verticalPosition: bottom,
          duration: 4 * 1000,
          panelClass: ['successSnackBar']
        });
      }, (error) => {
        this.snackBar.open(error.message, "Ok", {
          horizontalPosition: end,
          verticalPosition: bottom,
          duration: 4 * 1000,
          panelClass: ['validationSnackBar']
        });
      });
    }
  }
}
