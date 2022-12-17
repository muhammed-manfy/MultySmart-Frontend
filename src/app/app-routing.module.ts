import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddBrandsComponent } from './admin/add-brands/add-brands.component';
import { AddOffersComponent } from './admin/add-offers/add-offers.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AddProjectComponent } from './admin/add-project/add-project.component';
import { AddVideosComponent } from './admin/add-videos/add-videos.component';
import { AdminBrandsComponent } from './admin/brands/brands.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MessagesComponent } from './admin/messages/messages.component';
import { OffersComponent } from './admin/offers/offers.component';
import { AdminProductsComponent} from './admin/products/products.component';
import { AdminProjectsComponent} from './admin/projects/projects.component';
import { UpdateBrandComponent } from './admin/UpdateData/update-brand/update-brand.component';
import { UpdateOfferComponent } from './admin/UpdateData/update-offer/update-offer.component';
import { UpdateProductComponent } from './admin/UpdateData/update-product/update-product.component';
import { UpdateProjectComponent } from './admin/UpdateData/update-project/update-project.component';
import { UpdateVideoComponent } from './admin/UpdateData/update-video/update-video.component';
import { AdminUsersComponent} from './admin/users/users.component';
import { AdminVideosComponent} from './admin/videos/videos.component';
import { BrandNameComponent } from './brand-name/brand-name.component';
import { BrandsComponent } from './brands/brands.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './HomeComponent/home/home.component';
import { ProcessComponent } from './process/process.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { ServicesComponent } from './services/services.component';
import { ShippingComponent } from './shipping/shipping.component';
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
  {path:'brand-name',component:BrandNameComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'shipping',component:ShippingComponent},
  {path:'product',component:ProductComponent},
  {path:'dashboard',component:DashboardComponent,
    children:[
      {path:"users",component:AdminUsersComponent},
      {path:"projects",component:AdminProjectsComponent},
      {path:"offers",component:OffersComponent},
      {path:"products",component:AdminProductsComponent},
      {path:"brands",component:AdminBrandsComponent},
      {path:"videos",component:AdminVideosComponent},
      {path:'add-project',component:AddProjectComponent},
      {path:'add-offer',component:AddOffersComponent},
      {path:'add-video',component:AddVideosComponent},
      {path:'add-brand',component:AddBrandsComponent},
      {path:'add-product',component:AddProductComponent},
      {path:'edit-brand' ,component:UpdateBrandComponent},
      {path:'edit-offer' ,component:UpdateOfferComponent},
      {path:'edit-project' ,component:UpdateProjectComponent},
      {path:'edit-product' ,component:UpdateProductComponent},
      {path:'edit-video' ,component:UpdateVideoComponent},
      {path:'messages',component:MessagesComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
