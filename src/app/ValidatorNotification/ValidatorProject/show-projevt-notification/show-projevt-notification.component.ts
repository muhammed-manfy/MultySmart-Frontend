import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-show-projevt-notification',
  templateUrl: './show-projevt-notification.component.html',
  styleUrls: ['./show-projevt-notification.component.scss']
})
export class ShowProjevtNotificationComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data:any) { }

  ngOnInit(): void {
  }

}
