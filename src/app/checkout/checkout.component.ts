import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public totalOfProduct:Number=1;
  constructor() { }

  ngOnInit(): void {
  }


  increment(value:any){
    this.totalOfProduct = value + 1;
  }

  decrement(value:any){
    if(this.totalOfProduct > 1)
    this.totalOfProduct = value - 1;
  }

}
