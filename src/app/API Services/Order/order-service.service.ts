import { Injectable } from '@angular/core';
import { BasicApiService } from '../Basic/basic-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from 'src/app/Models/Order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService extends BasicApiService {

  constructor(private http: HttpClient) {
    super();
  }

  async orderRequset(orderData: any): Promise<Observable<Order>> {
    return await this.http.post<Order>(this.BaseUrl + '/orders/userOrder/create', orderData);
  }
  async orderRequsetWithUserAuth(orderData: any): Promise<Observable<Order>> {
    return await this.http.post<Order>(this.BaseUrl + '/orders/userAuth/userOrder/create', orderData);
  }
  async getUserOrders(userId: any , currentPage:any , pageSize:any): Promise<Observable<Order[]>> {
    return await this.http.post<Order[]>(this.BaseUrl + '/orders/users/getUserOrders/' + userId,
    {currentPage:currentPage,pageSize:pageSize} ,{ headers: this.headers });
  }
  async getUserOrdersToCanceled(userId:any):Promise<Observable<Order>>{
    return await this.http.get<Order>(this.BaseUrl + '/orders/users/getUserOrdersCanceled/' + userId);
  }

}
