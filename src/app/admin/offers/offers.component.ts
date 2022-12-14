import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/app/API Services/Offer/offer.service';
import { offersInfo } from 'src/app/Models/Offer.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  offersReceived:any;
  offerList = Array<offersInfo>();
  constructor( private offerService :OfferService) { }

  async ngOnInit():Promise <void> {
    await (await this.offerService.getOffers()).subscribe((offers:offersInfo)=>{
      this.offersReceived = offers;
      console.log(offers)
      this.offerList = this.offersReceived.map((offer:any)=>{
        return offer;
      })
    });
  }
}
