import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './CommonComponents/navbar/navbar.component';
import { FooterComponent } from './CommonComponents/footer/footer.component';
import { HomeComponent } from './HomeComponent/home/home.component';
import { ProductsComponent } from './products/products.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
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
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { AdminUsersComponent } from './admin/users/users.component';
import { AdminBlogsComponent } from './admin/blogs/blogs.component';
import { OrdersAdminComponent } from './admin/orders/orders.component';
import { AddBlogComponent } from './admin/add-blog/add-blog.component';
import { AddBrandsComponent } from './admin/add-brands/add-brands.component';
import { AddVideosComponent } from './admin/add-videos/add-videos.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddOffersComponent } from './admin/add-offers/add-offers.component';
import { ShowProjevtNotificationComponent } from './ValidatorNotification/ValidatorProject/show-projevt-notification/show-projevt-notification.component';
import { HttpClientModule } from '@angular/common/http';
import { ShowAdminLoginNotificationsComponent } from './ValidatorNotification/ValidatorOffer/show-offer-notifications/show-admin-login-notifications.component';
import { ShowProductNotificatoinsComponent } from './ValidatorNotification/ValidatorProduct/show-product-notificatoins/show-product-notificatoins.component';
import { ShowVideoNotificatoinsComponent } from './ValidatorNotification/ValidatorVideo/show-video-notificatoins/show-video-notificatoins.component';
import { AdminProductsComponent } from './admin/products/products.component';
import { AdminVideosComponent } from './admin/videos/videos.component';
import { AdminBrandsComponent } from './admin/brands/brands.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteProjectComponent } from './Dialogs/Projects/delete-project/delete-project.component';
import { DeleteVideoComponent } from './Dialogs/Videos/delete-video/delete-video.component';
import { DeleteProductComponent } from './Dialogs/Products/delete-product/delete-product.component';
import { DeleteOfferComponent } from './Dialogs/Offers/delete-offer/delete-offer.component';
import { DeletebrandComponent } from './Dialogs/Brands/deletebrand/deletebrand.component';
import { UpdateProjectComponent } from './admin/UpdateData/update-blog/update-project.component';
import { UpdateProductComponent } from './admin/UpdateData/update-product/update-product.component';
import { UpdateVideoComponent } from './admin/UpdateData/update-video/update-video.component';
import { UpdateBrandComponent } from './admin/UpdateData/update-brand/update-brand.component';
import { UpdateOfferComponent } from './admin/UpdateData/update-offer/update-offer.component';
import { MessagesComponent } from './admin/messages/messages.component';
import { DeleteMessagesComponent } from './Dialogs/Messages/delete-messages/delete-messages.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoginUserComponent } from './login-user/login-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CartComponent } from './cart/cart.component';
import { UserPageComponent } from './userPage/user-page/user-page.component';
import { AddressComponent } from './userPage/address/address.component';
import { ProductDetailsComponent } from './userPage/product-details/product-details.component';
import { ProfileComponent } from './userPage/profile/profile.component';
import { ReturnComponent } from './userPage/return/return.component';
import { OrdersComponent } from './userPage/orders/orders.component';
import { ReturnDialogComponent } from './userPage/Dialogs/return-dialog/return-dialog.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { UserOrdersComponent } from './admin/user-orders/user-orders.component';
import { AcceptOrderComponent } from './Dialogs/accept-order/accept-order.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { AdminValidationComponent } from './ValidatorNotification/AdminValidation/admin-validation/admin-validation.component';
import { AdminAuthGuard } from './admin/Auth/admin-auth.guard';
import { AdminServiceService } from './API Services/Admin/admin-service.service';
import { RegisterUserValidationComponent } from './ValidatorNotification/register-user/register-validation-user.component';
import { CheckOutValidationComponent } from './ValidatorNotification/CheckOutValidation/check-out-validation/check-out-validation.component';
import { DelieveryProductComponent } from './Dialogs/delievery-product/delievery-product.component';
import { DeleteCommentComponent } from './Dialogs/delete-comment/delete-comment.component';
import { DelieveryOrdersComponent } from './admin/delievery-orders/delievery-orders.component';
import { CanceledOrderssComponent } from './admin/canceled-orderss/canceled-orderss.component';
import { OrderCreatedMessageComponent } from './Dialogs/order-created-message/order-created-message.component';

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
    OrdersAdminComponent,
    AddBlogComponent,
    AddBrandsComponent,
    AddVideosComponent,
    AddProductComponent,
    AddOffersComponent,
    ShowProjevtNotificationComponent,
    ShowAdminLoginNotificationsComponent,
    ShowProductNotificatoinsComponent,
    ShowVideoNotificatoinsComponent,
    AdminBlogsComponent,
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
    UpdateOfferComponent,
    MessagesComponent,
    DeleteMessagesComponent,
    LoginUserComponent,
    RegisterUserComponent,
    CartComponent,
    UserPageComponent,
    AddressComponent,
    ProductDetailsComponent,
    ProfileComponent,
    ReturnComponent,
    OrdersComponent,
    ReturnDialogComponent,
    AdminProfileComponent,
    UserOrdersComponent,
    AcceptOrderComponent,
    LoginAdminComponent,
    AdminValidationComponent,
    RegisterUserValidationComponent,
    CheckOutValidationComponent,
    DelieveryProductComponent,
    DeleteCommentComponent,
    DelieveryOrdersComponent,
    CanceledOrderssComponent,
    OrderCreatedMessageComponent
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
    MatDialogModule,
    MatPaginatorModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatTabsModule,
    MatInputModule,
    MatStepperModule,
    Ng2SearchPipeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AdminAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
