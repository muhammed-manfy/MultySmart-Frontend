import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BrandService } from 'src/app/API Services/Brand/brand.service';
import { DeletebrandComponent } from 'src/app/Dialogs/Brands/deletebrand/deletebrand.component';

@Component({
  selector: 'app-admin-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class AdminBrandsComponent implements OnInit {
  brandsReceived:any;
  constructor(private brnadService: BrandService ,
     public dialog:MatDialog ,
    private router:Router) { }

    totalBrands:any;
    pageSize  = 10;
    currentPage = 0;
    pageEvent!:PageEvent;

    ngOnInit(): void{
    // this.getBrandsPagination(this.pageSize,this.currentPage);
  }
  handlePagination(event:PageEvent){
    this.pageEvent = event;
    this.totalBrands = event.length;
    // this.getBrandsPagination(event.pageSize,(event.pageIndex));
  }
  // async getBrandsPagination(pageSize:any,currentPage:any):Promise<any>{
  //   (await this.brnadService.getBrandsPagination(pageSize,currentPage)).subscribe((brands: brandInfo) => {
  //     this.brandsReceived = brands;
  //     console.log(brands)
  //     this.brandsList = this.brandsReceived.brands.map((e:any)=>{
  //       return e;
  //     });
  //     this.totalBrands = this.brandsReceived.totalBrands;
  //   });
  // }


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
