import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor() {
    $(document).ready(function(){
      $(".product-speceifcation > p").hide();
    })
    $(document).ready(function(){
      $(".product-description-toggle").click(function(){
        $("#product-description-toggle").toggle(300);
      });
    })
    $(document).ready(function(){
      $(".product-features-toggle").click(function(){
        $("#product-features-toggle").toggle(300);
      });
    })

  }

  ngOnInit(): void {
  }

}
