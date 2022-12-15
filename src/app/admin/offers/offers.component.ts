import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OfferService } from 'src/app/API Services/Offer/offer.service';
import { DeleteOfferComponent } from 'src/app/Dialogs/Offers/delete-offer/delete-offer.component';
import { offersInfo } from 'src/app/Models/Offer.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  offersReceived:any;
  offerList = Array<offersInfo>();
  constructor( private offerService :OfferService
     , public dialog:MatDialog
     , public router:Router) { }

  async ngOnInit():Promise <void> {
    await (await this.offerService.getOffers()).subscribe((offers:offersInfo)=>{
      this.offersReceived = offers;
      console.log(offers)
      this.offerList = this.offersReceived.map((offer:any)=>{
        return offer;
      })
    });
  }
  deleteOffer(id:any){
    this.dialog.open(DeleteOfferComponent,{
      data:{
        id:id
      },
      width:"300px"
    });
  }
  editOffer(offer:any){
    this.router.navigate(['dashboard/edit-offer'],{state:offer});
  }
}
