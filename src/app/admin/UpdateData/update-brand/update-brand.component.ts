import { Component, OnInit ,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from 'src/app/API Services/Admin/admin-service.service';

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.scss']
})
export class UpdateBrandComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public data:any){}

  ngOnInit():void {
  }

}
