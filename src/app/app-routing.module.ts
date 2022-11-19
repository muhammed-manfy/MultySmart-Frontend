import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { BrandNameComponent } from './brand-name/brand-name.component';
import { BrandsComponent } from './brands/brands.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './HomeComponent/home/home.component';
import { ProcessComponent } from './process/process.component';
import { ProductsComponent } from './products/products.component';
import { ServicesComponent } from './services/services.component';
import { VideosComponent } from './videos/videos.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'products', component:ProductsComponent},
  {path:'videos',component:VideosComponent},
  {path:'brands',component:BrandsComponent},
  {path:'services',component:ServicesComponent},
  {path:'process',component:ProcessComponent},
  {path:'about-us',component:AboutUsComponent},
  {path:'contact-us',component:ContactUsComponent},
  {path:'brand-name',component:BrandNameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
