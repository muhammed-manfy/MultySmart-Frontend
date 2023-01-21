import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { extend } from 'jquery';
import { catchError, Observable, Subject } from 'rxjs';
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

  async getProducts(){
    return await this.http.get<productInfo>(this.BaseUrl+'/products').pipe(catchError(this.handleError));
  }

  async  deleteProducts(id:any){
    return await this.http.delete(this.BaseUrl+'/products/delete/'+id).pipe(catchError(this.handleError));
  }

  async updateProducts(id:any,productData:any):Promise<Observable<productInfo>>{
    return await this.http.put<productInfo>(this.BaseUrl+'/products/update/'+id,productData)
    .pipe(catchError(this.handleError));
  }
  async getProductsPagination(pageSize:Number,currentPage:Number){
    return await this.http.post<productInfo>(this.BaseUrl+'/products/pagination',{pageSize:pageSize,
      currentPage:currentPage}).pipe(catchError(this.handleError));
  }
  getCategories():Observable<any>{
    return this.http.get(this.BaseUrl+'/categories').pipe(catchError(this.handleError));
  }
  async productsDisplay(category:any,brand:any,pageSize:Number,currentPage:Number):Promise<Observable<productInfo>>{
    return await this.http.post<productInfo>(this.BaseUrl+'/products/productsDisplay',{pageSize:pageSize,currentPage :currentPage,
    brandRequset:brand,categoryRequset:category}).pipe(catchError(this.handleError));
  }
  async getProductInfo(id:string){
    return await this.http.get(this.BaseUrl+'/products/getProductInfo/' + id).pipe(catchError(this.handleError));
  }
}
