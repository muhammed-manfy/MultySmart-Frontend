import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BrandService } from 'src/app/API Services/Brand/brand.service';
import { DeletebrandComponent } from 'src/app/Dialogs/Brands/deletebrand/deletebrand.component';
import { brandInfo } from 'src/app/Models/Brand.model';

@Component({
  selector: 'app-admin-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class AdminBrandsComponent implements OnInit {
  brandsReceived:any;
  brandsList = Array<brandInfo>();
  constructor(private brnadService: BrandService ,
     public dialog:MatDialog ,
    private router:Router) { }

  async ngOnInit(): Promise<void> {
    (await this.brnadService.getBrands()).subscribe((brands: brandInfo) => {
      this.brandsReceived = brands;
      this.brandsList = this.brandsReceived.map((e:any)=>{
        return e;
      });
    });
  }

  updateBrand(brand:any){
  this.router.navigate(['dashboard/edit-brand'],{state:brand});
  }

  deleteBrand(id:any){
    this.dialog.open(DeletebrandComponent,{
      data:{
        id:id
      },
      width:"300px"
    })
  }
}
