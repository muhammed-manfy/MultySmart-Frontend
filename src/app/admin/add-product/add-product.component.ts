import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public featuresItem:Array<String>=[];
  verifyOfValue:Number =0;
  constructor() { }

  ngOnInit(): void {
  }
  addItem(value:any){
    if(value === ''){
      this.verifyOfValue = +1;
    }
    else{
      this.featuresItem.push(value);
      this.verifyOfValue = 0;
    }

  }
  removeItem(index:any){
    this.featuresItem.splice(index,1);
    console.log(this.featuresItem.length)
  }
}
