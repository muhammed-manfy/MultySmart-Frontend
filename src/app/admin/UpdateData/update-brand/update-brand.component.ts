import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/API Services/Brand/brand.service';

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.scss']
})
export class UpdateBrandComponent implements OnInit {
  updateBrand: FormGroup;
  messageResponse: any;
  brandReceived:any;
  idBrnad:any;
  constructor(
    public snackBar: MatSnackBar,
    private brandService: BrandService ,
    private formBuilder:FormBuilder,
    private router:Router){
      this.brandReceived = this.router.getCurrentNavigation()?.extras.state;
      this.idBrnad =this.brandReceived._id;
      console.log(this.brandReceived);
      this.updateBrand = this.formBuilder.group({
      brandName: ['', [Validators.required]]
    })
  }
  get brandName() {
    return this.updateBrand.get('brandName')?.valid;
  }
  ngOnInit(): void {
  }

  ValidationNotification() {
    this.snackBar.open("The brand is required", "Ok", {
      horizontalPosition: "end",
      verticalPosition: "bottom",
      duration: 4 * 1000,
      panelClass: ['validationSnackBar']
    });
  }
  async formSubmit() {
    if (!this.updateBrand.valid)
      this.ValidationNotification();
    else {
      let brand = this.updateBrand.value.brandName;
      const brandUpdate = {brand};
      (await this.brandService.updateBrand(this.idBrnad,brandUpdate)).subscribe(response=>{
        this.messageResponse = response;
        this.snackBar.open(this.messageResponse.message, "Ok", {
          horizontalPosition: "end",
          verticalPosition: "bottom",
          duration: 4 * 1000,
          panelClass: ['successSnackBar']
        });
      },(error)=>{
        this.snackBar.open("Some Error is happend on Server", "Ok", {
          horizontalPosition: "end",
          verticalPosition: "bottom",
          duration: 4 * 1000,
          panelClass: ['validationSnackBar']
        });
      });
    }
  }
}
