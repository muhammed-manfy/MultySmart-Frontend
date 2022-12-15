import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrandService } from 'src/app/API Services/Brand/brand.service';
import { OfferService } from 'src/app/API Services/Offer/offer.service';

@Component({
  selector: 'app-deletebrand',
  templateUrl: './deletebrand.component.html',
  styleUrls: ['./deletebrand.component.scss']
})
export class DeletebrandComponent implements OnInit {
  idBrand = this.data.id;
  messageResponse: any;
  constructor(@Inject(MAT_DIALOG_DATA)public data:any , public snackBar:MatSnackBar,
  private brandService:BrandService) { }

  ngOnInit(): void {
  }

  async deleteRecord() {
    (await this.brandService.deleteBrand(this.idBrand)).subscribe(response => {
      this.messageResponse = response;
      console.log(response);
        this.snackBar.open(this.messageResponse.message, "Ok", {
        horizontalPosition: "end",
        verticalPosition: "bottom",
        duration: 4 * 1000,
        panelClass: ['successSnackBar']
      });
    }, (err) => {
      this.snackBar.open("Some Error is happend On Server", "Ok", {
        horizontalPosition: "end",
        verticalPosition: "bottom",
        duration: 4 * 1000,
        panelClass: ['validationSnackBar']
      });
    });
  }

}
