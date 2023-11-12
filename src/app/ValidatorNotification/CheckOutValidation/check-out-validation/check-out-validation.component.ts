import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-check-out-validation',
  templateUrl: './check-out-validation.component.html',
  styleUrls: ['./check-out-validation.component.scss']
})
export class CheckOutValidationComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA)public data:any) { }

  ngOnInit(): void {
  }

}
