import { Component, OnInit } from '@angular/core';
import { BrandService } from '../API Services/Brand/brand.service';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  brandsReceived:any;
  totalBrands:Number=0;
  searchField:any;
  character:any;
  charactersList = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','X','W','Y','Z'];
  constructor(private brandService:BrandService) {}

  ngOnInit(): void {
      
  }

}