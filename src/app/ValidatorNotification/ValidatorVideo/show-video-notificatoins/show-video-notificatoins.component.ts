import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-show-video-notificatoins',
  templateUrl: './show-video-notificatoins.component.html',
  styleUrls: ['./show-video-notificatoins.component.scss']
})
export class ShowVideoNotificatoinsComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA)public data:any) { }

  ngOnInit(): void {
  }

}
