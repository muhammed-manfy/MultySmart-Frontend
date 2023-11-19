import { Injectable } from '@angular/core';
import { BasicApiService } from '../Basic/basic-api.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/User.model';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Order } from 'src/app/Models/Order.model';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService extends BasicApiService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar, private route: Router) {
    super();
  }
  async getAllUsers(currentPage:number,pageSize:number):Promise<Observable<User[]>>{
    return await this.http.post<User[]>(this.BaseUrl+'/users/admin/allUsers',{
      currentPage:currentPage,pageSize:pageSize},{headers:this.adminHeaders});
  }
  async loginUser(loginUserData: any): Promise<Observable<User>> {
    return this.http.post<User>(this.BaseUrl + '/users/login', loginUserData);
  }
  async registerUser(registerUserData: any): Promise<Observable<User>> {
    return this.http.post<User>(this.BaseUrl + '/users/register', registerUserData);
  }
  async updateAddress(addressData: any, userId: any): Promise<Observable<User>> {
    return this.http.put<User>(this.BaseUrl + '/users/updateAddress/' + userId, addressData, { headers: this.headers });
  }
  async getUser(userId: any) {
    return await this.http.get<User>(this.BaseUrl + "/users/getUser/" + userId, { headers: this.headers });
  }
  async updateEmailUser(email: any, userId: any): Promise<Observable<User>> {
    return await this.http.put<User>(this.BaseUrl + "/users/updateEmailUser/" + userId, email, { headers: this.headers });
  }
  async updatePhoneUser(phone: any, userId: any): Promise<Observable<User>> {
    return await this.http.put<User>(this.BaseUrl + "/users/updatePhoneUser/" + userId, phone, { headers: this.headers });
  }
  async updatePasswordUser(password: any, userId: any): Promise<Observable<User>> {
    return await this.http.put<User>(this.BaseUrl + "/users/updatePasswordUser/" + userId, password, { headers: this.headers });
  }
  async deleteUser(userId: any) {
    return await this.http.delete(this.BaseUrl + "/users/deleteUser/" + userId, { headers: this.headers });
  }
  async changeImageProfile(userId: any, imageProfile: any) {
    return await this.http.put(this.BaseUrl + "/users/updateUserImage/" + userId, imageProfile, { headers: this.headers });
  }
  async updateProductsStatusToCanceled(products_info: any ,orders_ids:any, reasonText:any) {
    return await this.http.put(this.BaseUrl + '/orders/updateProductsStatusToCanceled',{products_ids:products_info,
      reasonText:reasonText,orders_ids:orders_ids},{headers: this.headers});
  }
  async getCanceledProductsStatus(currentPage:any,pageSize:any):Promise<Observable<Order>>{
    return await this.http.post<Order>(this.BaseUrl + '/orders/user/getOrdersCanceledStatusProducts',{currentPage:currentPage
      ,pageSize:pageSize});
  }

  logoutUser(): void {
    this.snackBar.open("You are logged out", "Ok", {
      duration: 3 * 1000,
      horizontalPosition: 'left',
      verticalPosition: "bottom",
      panelClass: ['success']
    });
    localStorage.removeItem('user-token');
    localStorage.removeItem('expiresIn-duration');
    localStorage.removeItem('username');
    localStorage.removeItem("previousUrl");
    this.route.navigateByUrl('/login');
  } // logout user

  checkUserIsLogIn() {
    if (localStorage.getItem("user-token") !== null){
      return  true;
    }else{
      return false;
    }
  } // user.isLoggedIn
}
