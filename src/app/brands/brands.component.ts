import { Component, OnInit } from '@angular/core';
import { BrandService } from '../API Services/Brand/brand.service';
import { brandInfo } from '../Models/Brand.model';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  brandsReceived:any;
  brandsList = Array<brandInfo>();
  totalBrands:Number=0;
  constructor(private brandService:BrandService) {}

  ngOnInit(): void {
    this.brandService.getBrands().subscribe((allBrands:brandInfo)=>{
      this.brandsReceived = allBrands;
      this.brandsList = this.brandsReceived.map((brand:any)=>{
        return brand;
      });
      this.totalBrands = this.brandsList.length;
    });
  }

}
