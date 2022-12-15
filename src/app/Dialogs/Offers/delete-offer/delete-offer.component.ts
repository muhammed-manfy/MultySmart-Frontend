import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OfferService } from 'src/app/API Services/Offer/offer.service';

@Component({
  selector: 'app-delete-offer',
  templateUrl: './delete-offer.component.html',
  styleUrls: ['./delete-offer.component.scss']
})
export class DeleteOfferComponent implements OnInit {

  idOffer = this.data.id;
  messageResponse: any;
  constructor(@Inject(MAT_DIALOG_DATA)public data:any , public snackBar:MatSnackBar,
  private offerService:OfferService) { }
  ngOnInit(): void {
  }
  async deleteRecord() {
    (await this.offerService.deleteOffer(this.idOffer)).subscribe(response => {
      this.messageResponse = response;
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
