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
  searchField:any;
  character:any;
  charactersList = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','X','W','Y','Z'];
  constructor(private brandService:BrandService) {}

  ngOnInit(): void {
    this.brandsDisplay();
  }

  async brandsDisplay(){
    (await this.brandService.displayBrnads(this.character)).subscribe((brands:brandInfo)=>{
      this.brandsReceived = brands;
      this.brandsList = this.brandsReceived.brands.map((brand:any)=>{
        return brand;
      });
      this.totalBrands = this.brandsList.length
      console.log(brands,this.character)
    });
  }

  filterBrands(value:any){
    this.character = value;
    this.brandsDisplay();
  }
  resetBrnads(value:any){
    this.character = value;
    this.brandsDisplay();
  }
}
