import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OfferService } from 'src/app/API Services/Offer/offer.service';
import { offersInfo } from 'src/app/Models/Offer.model';


@Component({
  selector: 'app-add-offers',
  templateUrl: './add-offers.component.html',
  styleUrls: ['./add-offers.component.scss']
})
export class AddOffersComponent implements OnInit {

  public addOfferForm: FormGroup;
  public featuresItem = Array<any>();
  verifyOfItems: Number = 0;
  featureslength: Boolean = true;
  messageResponse: any;
  offerInfo: offersInfo | undefined;
  constructor(private formBuilder: FormBuilder, private snakBar: MatSnackBar, private offerService: OfferService) {
    this.addOfferForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      priceAndPeriod: ['', [Validators.required]],
      features: ['', [Validators.required]]
    })
  }

  get title() {
    return this.addOfferForm.get('title')?.valid;
  }
  get priceAndPeriod() {
    return this.addOfferForm.get('priceAndPeriod')?.valid;
  }
  get features() {
    return this.addOfferForm.get('features')?.valid;
  }

  ngOnInit(): void {

  }

  // valdiationNotification() {
  //   this.snakBar.openFromComponent(ShowOfferNotificationsComponent, {
  //     data: {
  //       title: this.title,
  //       price: this.priceAndPeriod,
  //       features: this.features,
  //       featureslength: this.featureslength
  //     },
  //     horizontalPosition: "end",
  //     verticalPosition: "bottom",
  //     duration: 4 * 1000
  //   })
  // }

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

  async submitForm() {
    if (this.featuresItem.length == 0 && this.features) {
      this.featureslength = false;
    }
    if (!this.addOfferForm.valid)
      // this.valdiationNotification()
      return ;
    else {
      let title =this.addOfferForm.value.title;
      let priceAndPeriod =this.addOfferForm.value.priceAndPeriod;
      let features = this.featuresItem;
      const offer  ={
        title:title,
        priceAndPeriod:priceAndPeriod,
        features:features
      } ;
        (await this.offerService.createOffer(offer)).subscribe(response => {
        this.messageResponse = response;
        this.snakBar.open(this.messageResponse.message, "Ok", {
            horizontalPosition: "end",
            verticalPosition: "bottom",
            duration: 4 * 1000,
            panelClass: ['successSnackBar']
          })
        }, (err) => {
          this.snakBar.open(err, "Ok", {
            horizontalPosition: "end",
            verticalPosition: "bottom",
            duration: 4 * 1000,
            panelClass: ['validationSnackBar']
          });
        });
    }
  }
}
