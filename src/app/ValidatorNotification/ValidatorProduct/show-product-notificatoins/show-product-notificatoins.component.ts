import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-show-product-notificatoins',
  templateUrl: './show-product-notificatoins.component.html',
  styleUrls: ['./show-product-notificatoins.component.scss']
})
export class ShowProductNotificatoinsComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA)public data:any) { }

  ngOnInit(): void {
  }

}
