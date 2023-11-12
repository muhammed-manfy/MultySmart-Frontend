import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-created-message',
  templateUrl: './order-created-message.component.html',
  styleUrls: ['./order-created-message.component.scss']
})
export class OrderCreatedMessageComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA)public data:any) { }

  ngOnInit(): void {
  }

}
