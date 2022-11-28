import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './CommonComponents/navbar/navbar.component';
import { FooterComponent } from './CommonComponents/footer/footer.component';
import { HomeComponent } from './HomeComponent/home/home.component';
import { ProductsComponent } from './products/products.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { VideosComponent } from './videos/videos.component';
import { BrandsComponent } from './brands/brands.component';
import { ServicesComponent } from './services/services.component';
import { ProcessComponent } from './process/process.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { BrandNameComponent } from './brand-name/brand-name.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductComponent } from './product/product.component';
import { ShippingComponent } from './shipping/shipping.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { UsersComponent } from './admin/users/users.component';
import { ProjectsComponent } from './admin/projects/projects.component';
import { OffersComponent } from './admin/offers/offers.component';
import { AddProjectComponent } from './admin/add-project/add-project.component';
import { AddBrandsComponent } from './admin/add-brands/add-brands.component';
import { AddVideosComponent } from './admin/add-videos/add-videos.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AddOffersComponent } from './admin/add-offers/add-offers.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    VideosComponent,
    BrandsComponent,
    ServicesComponent,
    ProcessComponent,
    AboutUsComponent,
    ContactUsComponent,
    BrandNameComponent,
    CheckoutComponent,
    ProductComponent,
    ShippingComponent,
    DashboardComponent,
    UsersComponent,
    ProjectsComponent,
    OffersComponent,
    AddProjectComponent,
    AddBrandsComponent,
    AddVideosComponent,
    AddProductComponent,
    AddOffersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
