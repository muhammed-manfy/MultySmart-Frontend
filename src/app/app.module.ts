import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './CommonComponents/navbar/navbar.component';
import { FooterComponent } from './CommonComponents/footer/footer.component';
import { HomeComponent } from './HomeComponent/home/home.component';
import { ProductsComponent } from './products/products.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
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
import { MatMenuModule} from '@angular/material/menu';
import { MatListModule} from '@angular/material/list';
import { MatExpansionModule} from '@angular/material/expansion';
import { AdminUsersComponent } from './admin/users/users.component';
import { AdminProjectsComponent} from './admin/projects/projects.component';
import { OffersComponent } from './admin/offers/offers.component';
import { AddProjectComponent } from './admin/add-project/add-project.component';
import { AddBrandsComponent } from './admin/add-brands/add-brands.component';
import { AddVideosComponent } from './admin/add-videos/add-videos.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { AddOffersComponent } from './admin/add-offers/add-offers.component';
import { ShowProjevtNotificationComponent } from './ValidatorNotification/ValidatorProject/show-projevt-notification/show-projevt-notification.component';
import { HttpClientModule } from '@angular/common/http';
import { ShowOfferNotificationsComponent } from './ValidatorNotification/ValidatorOffer/show-offer-notifications/show-offer-notifications.component';
import { ShowProductNotificatoinsComponent } from './ValidatorNotification/ValidatorProduct/show-product-notificatoins/show-product-notificatoins.component';
import { ShowVideoNotificatoinsComponent } from './ValidatorNotification/ValidatorVideo/show-video-notificatoins/show-video-notificatoins.component';
import { AdminProductsComponent } from './admin/products/products.component';
import { AdminVideosComponent } from './admin/videos/videos.component';
import { AdminBrandsComponent } from './admin/brands/brands.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteProjectComponent } from './Dialogs/Projects/delete-project/delete-project.component';
import { DeleteVideoComponent } from './Dialogs/Videos/delete-video/delete-video.component';
import { DeleteProductComponent } from './Dialogs/Products/delete-product/delete-product.component';
import { DeleteOfferComponent } from './Dialogs/Offers/delete-offer/delete-offer.component';
import { DeletebrandComponent } from './Dialogs/Brands/deletebrand/deletebrand.component';
import { UpdateProjectComponent } from './admin/UpdateData/update-project/update-project.component';
import { UpdateProductComponent } from './admin/UpdateData/update-product/update-product.component';
import { UpdateVideoComponent } from './admin/UpdateData/update-video/update-video.component';
import { UpdateBrandComponent } from './admin/UpdateData/update-brand/update-brand.component';
import { UpdateOfferComponent } from './admin/UpdateData/update-offer/update-offer.component';
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
    AdminUsersComponent,
    OffersComponent,
    AddProjectComponent,
    AddBrandsComponent,
    AddVideosComponent,
    AddProductComponent,
    AddOffersComponent,
    ShowProjevtNotificationComponent,
    ShowOfferNotificationsComponent,
    ShowProductNotificatoinsComponent,
    ShowVideoNotificatoinsComponent,
    AdminProjectsComponent,
    AdminProductsComponent,
    AdminVideosComponent,
    AdminBrandsComponent,
    DeleteProjectComponent,
    DeleteVideoComponent,
    DeleteProductComponent,
    DeleteOfferComponent,
    DeletebrandComponent,
    UpdateProjectComponent,
    UpdateProductComponent,
    UpdateVideoComponent,
    UpdateBrandComponent,
    UpdateOfferComponent
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
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
