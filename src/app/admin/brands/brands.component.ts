import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/API Services/Brand/brand.service';
import { brandInfo } from 'src/app/Models/Brand.model';

@Component({
  selector: 'app-admin-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class AdminBrandsComponent implements OnInit {
  brandsReceived:any;
  brandsList = Array<brandInfo>();
  constructor(private brnadService: BrandService) { }

  async ngOnInit(): Promise<void> {
    (await this.brnadService.getBrands()).subscribe((brands: brandInfo) => {
      this.brandsReceived = brands;
      this.brandsList = this.brandsReceived.map((e:any)=>{
        return e;
      });
    });
  }
}
