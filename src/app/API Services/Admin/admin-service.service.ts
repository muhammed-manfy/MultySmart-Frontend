import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicApiService } from '../Basic/basic-api.service';
import { Observable, catchError } from 'rxjs';
import { Admin } from 'src/app/Models/Admin.model';
import { Order } from 'src/app/Models/Order.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/Models/User.model';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService extends BasicApiService {

  constructor(private http: HttpClient, private router: Router,
    private snackBar: MatSnackBar) {
    super();
  }
  async loginAdmin(adminData: any): Promise<Observable<Admin>> {
    return await this.http.post<Admin>(this.BaseUrl + '/admin/login', adminData);
  }

  async updateProfileEmail(id: any, email: any): Promise<Observable<Admin>> {
    return await this.http.put<any>(this.BaseUrl + '/admin/updateEmail/profile/' + id, email, { headers: this.adminHeaders });
  }

  async updateProfilePassword(id: any, password: any): Promise<Observable<Admin>> {
    return await this.http.put<any>(this.BaseUrl + '/admin/updateEmail/profile/' + id, password, { headers: this.adminHeaders });
  }

  async getOrdersRequests(currentPage:number,pageSize:number):Promise<Observable<Order[]>> {
    return await this.http.post<Order[]>(this.BaseUrl + '/orders/admin/getOrdersRequests', {currnetPage:currentPage,pageSize:pageSize});
  }

  async getOrdersShippingStatus(currentPage:number , pageSize:number):Promise<Observable<Order>> {
    return await this.http.post<Order>(this.BaseUrl + '/orders/admin/getShippingStatus',{currentPage:currentPage, pageSize:pageSize});
  }

  async updateProductOrderStatusToShipping(id_no: number, order_id: any) {
    return await this.http.get(this.BaseUrl + '/orders/admin/updateProductStatusToShipping/' + id_no + '/' + order_id, { headers: this.adminHeaders });
  }

  async updateProductsStatusToDelivered(id_no: number, order_id: number) {
    return await this.http.get(this.BaseUrl + '/orders/admin/updateProductsStatusToDelivered/' + id_no + '/' + order_id, { headers: this.adminHeaders })
  }

  async getOrderUser(id: any): Promise<Observable<any>> {
    return await this.http.get<User>(this.BaseUrl + '/users/getOrderUser/' + id);
  }

  async getOrdersDeliveryStatus(currentPage: number, pageSize: number):Promise<Observable<Order>> {
    return await this.http.post<Order>(this.BaseUrl + '/orders/admin/getOrdersDeleviredStatusProducts',
      { currentPage: currentPage, pageSize: pageSize });
  }

  async getOrdersCanceledStatus(currentPage: number, pageSize: number):Promise<Observable<Order>> {
    return await this.http.post<Order>(this.BaseUrl + '/orders/admin/getCanceledStatus',
      { currentPage: currentPage, pageSize: pageSize });
  }

  logoutAdmin(): void {
    localStorage.clear();
    document.location.reload();
    this.snackBar.open("You Are Logged Out Now!", "CLOSE", {
      duration: 3 * 1000,
      horizontalPosition: "left",
      verticalPosition: "bottom",
      panelClass: ['success']
    });
  }
}
