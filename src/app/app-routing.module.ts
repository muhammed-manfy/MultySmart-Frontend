import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddBrandsComponent } from './admin/add-brands/add-brands.component';
import { AddOffersComponent } from './admin/add-offers/add-offers.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AddBlogComponent } from './admin/add-blog/add-blog.component';
import { AddVideosComponent } from './admin/add-videos/add-videos.component';
import { AdminBrandsComponent } from './admin/brands/brands.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MessagesComponent } from './admin/messages/messages.component';
import { OrdersAdminComponent } from './admin/orders/orders.component';
import { AdminProductsComponent } from './admin/products/products.component';
import { AdminBlogsComponent } from './admin/blogs/blogs.component';
import { UpdateBrandComponent } from './admin/UpdateData/update-brand/update-brand.component';
import { UpdateOfferComponent } from './admin/UpdateData/update-offer/update-offer.component';
import { UpdateProductComponent } from './admin/UpdateData/update-product/update-product.component';
import { UpdateProjectComponent } from './admin/UpdateData/update-blog/update-project.component';
import { UpdateVideoComponent } from './admin/UpdateData/update-video/update-video.component';
import { AdminUsersComponent } from './admin/users/users.component';
import { AdminVideosComponent } from './admin/videos/videos.component';
import { BrandNameComponent } from './brand-name/brand-name.component';
import { BrandsComponent } from './brands/brands.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './HomeComponent/home/home.component';
import { ProcessComponent } from './process/process.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { ServicesComponent } from './services/services.component';
import { VideosComponent } from './videos/videos.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { CartComponent } from './cart/cart.component';
import { UserPageComponent } from './userPage/user-page/user-page.component';
import { AddressComponent } from './userPage/address/address.component';
import { ProfileComponent } from './userPage/profile/profile.component';
import { ProductDetailsComponent } from './userPage/product-details/product-details.component';
import { ReturnComponent } from './userPage/return/return.component';
import { OrdersComponent } from './userPage/orders/orders.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { UserOrdersComponent } from './admin/user-orders/user-orders.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { AdminAuthGuard } from './admin/Auth/admin-auth.guard';
import { UserAuthGuard } from './admin/Auth/User/user-auth.guard';
import { DelieveryOrdersComponent } from './admin/delievery-orders/delievery-orders.component';
import { CanceledOrderssComponent } from './admin/canceled-orderss/canceled-orderss.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shop', component: ProductsComponent },
  { path: 'blogs', component: VideosComponent },
  { path: 'brands', component: BrandsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'process', component: ProcessComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'brand-name', component: BrandNameComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginUserComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'product/:productName', component: ProductComponent },
  { path: 'admin/login', component: LoginAdminComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AdminAuthGuard]
    , children: [
      { path: "profile", component: AdminProfileComponent },
      { path: "users", component: AdminUsersComponent },
      { path: "blogs", component: AdminBlogsComponent },
      { path: "orders", component: OrdersAdminComponent },
      { path: "products", component: AdminProductsComponent },
      { path: "brands", component: AdminBrandsComponent },
      { path: "videos", component: AdminVideosComponent },
      { path: 'add-blog', component: AddBlogComponent },
      { path: 'add-offer', component: AddOffersComponent },
      { path: 'add-video', component: AddVideosComponent },
      { path: 'add-brand', component: AddBrandsComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'viewUser', component: UpdateBrandComponent },
      { path: 'edit-offer', component: UpdateOfferComponent },
      { path: 'edit-project', component: UpdateProjectComponent },
      { path: 'edit-product', component: UpdateProductComponent },
      { path: 'edit-video', component: UpdateVideoComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'product/users', component: UserOrdersComponent},
      { path: 'deliverd', component: DelieveryOrdersComponent },
      { path: 'canceled', component: CanceledOrderssComponent }
    ]
  },
  {
    path: ':username', component: UserPageComponent, canActivate: [UserAuthGuard],
    children: [
      { path: 'address', component: AddressComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'product-details', component: ProductDetailsComponent },
      { path: 'returns', component: ReturnComponent },
      { path: 'orders', component: OrdersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
