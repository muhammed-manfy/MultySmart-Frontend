import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { extend } from 'jquery';
import { catchError, Observable } from 'rxjs';
import { productInfo } from 'src/app/Models/Product.model';
import { BasicApiService } from '../Basic/basic-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BasicApiService {

  constructor( private http:HttpClient) {
    super();
  }

  async createProduct(product:any):Promise<Observable<productInfo>>{
    return  await this.http.post<productInfo>(this.BaseUrl+'/products/create',product)
    .pipe(catchError(this.handleError));
  }

  async  getProducts(){
    return await this.http.get<productInfo>(this.BaseUrl+'/products').pipe(catchError(this.handleError));
  }
}
