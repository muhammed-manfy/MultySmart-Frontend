import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-show-admin-login-notifications',
  templateUrl: './show-admin-login-notifications.component.html',
  styleUrls: ['./show-admin-login-notifications.component.scss']
})
export class ShowAdminLoginNotificationsComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA)public data:any) { }

  ngOnInit(): void {
  }

}
