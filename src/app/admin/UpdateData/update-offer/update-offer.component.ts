import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OfferService } from 'src/app/API Services/Offer/offer.service';
import { offersInfo } from 'src/app/Models/Offer.model';
import { ShowOfferNotificationsComponent } from 'src/app/ValidatorNotification/ValidatorOffer/show-offer-notifications/show-offer-notifications.component';

@Component({
  selector: 'app-update-offer',
  templateUrl: './update-offer.component.html',
  styleUrls: ['./update-offer.component.scss']
})
export class UpdateOfferComponent implements OnInit {
  raoutingInfo:any;
  idOffer:any;
  featuresItem = Array<any>();
  verifyOfItems: Number = 0;
  featureslength: Boolean = true;
  messageResponse: any;
  offerInfo: offersInfo | undefined;
  constructor(private formBuilder: FormBuilder
    , private snakBar: MatSnackBar
    , private offerService: OfferService
    , public router:Router) {
        this.raoutingInfo = this.router.getCurrentNavigation()?.extras.state;
        this.featuresItem = this.raoutingInfo.features;
        this.idOffer = this.raoutingInfo._id;
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
  }

  validationNotification(){
    this.snakBar.open("Can't Update Data","Close",{
      horizontalPosition:"end",
      verticalPosition:"bottom",
      duration:1 * 4000,
      panelClass:['validationSnackBar']
    })
  }

  async submitForm(event:any) {
    const title = event.target.title.value;
    const priceAndPeriod = event.target.priceAndPeriod.value;
    if(!title || !priceAndPeriod || this.featuresItem.length == 0){
        this.validationNotification()
    }else{
      const offerUpdate= {
        title:title,
        priceAndPeriod:priceAndPeriod,
        features:this.featuresItem
      };
      (await this.offerService.updateOffer(this.idOffer,offerUpdate)).subscribe(response=>{
        this.messageResponse = response;
        console.log(this.messageResponse);
          this.snakBar.open(this.messageResponse.message,"Close",{
            horizontalPosition:"end",
            verticalPosition:"bottom",
            duration:1 * 4000,
            panelClass:['successSnackBar']
          });
          this.router.navigate(['dashboard/offers'])
      },(error)=>{
        this.snakBar.open("Some Error is happend please try later!","Close",{
          horizontalPosition:"end",
          verticalPosition:"bottom",
          duration:1 * 4000,
          panelClass:['validationSnackBar']
        })
      })
    }
  }
}
