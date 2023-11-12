import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-validation',
  templateUrl: './admin-validation.component.html',
  styleUrls: ['./admin-validation.component.scss']
})
export class AdminValidationComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA)public data:any) { }

  ngOnInit(): void {
  }

}
