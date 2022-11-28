import { Component, OnInit } from '@angular/core';
import { arrow } from '@popperjs/core';

@Component({
  selector: 'app-add-offers',
  templateUrl: './add-offers.component.html',
  styleUrls: ['./add-offers.component.scss']
})
export class AddOffersComponent implements OnInit {

  public featuresItem:Array<String>=[];
  constructor() { }

  ngOnInit(): void {

  }
  addItem(value:any){
    console.log(value);
    this.featuresItem.push(value);
  }
}
