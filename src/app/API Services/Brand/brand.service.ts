import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BasicApiService } from '../Basic/basic-api.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService extends BasicApiService {

  constructor( private http:HttpClient) {
    super();
   }
  }
//   async createBrand(brandData:any):Promise<Observable<brandInfo>>{
//     return await this.http.post<brandInfo>(this.BaseUrl+'/brands/create',brandData).
//     pipe(catchError(this.handleError));
//   }

//   getBrands(){
//     return this.http.get<brandInfo>(this.BaseUrl+'/brands').pipe(catchError(this.handleError));
//   }
//   async deleteBrand(id:any){
//     return await this.http.delete(this.BaseUrl+'/brands/delete/'+id).pipe(catchError(this.handleError));
//   }

//   async updateBrand(id:String,brandData:any):Promise<Observable<brandInfo>>{
//     return await this.http.put<brandInfo>(this.BaseUrl+'/brands/update/'+id,brandData)
//     .pipe(catchError(this.handleError));
//   }

//   async getBrandsPagination(pageSize:Number,currentPage:Number){
//     return await this.http.post<brandInfo>(this.BaseUrl+'/brands/pagination',{pageSize:pageSize,currentPage:currentPage}).pipe(catchError(this.handleError));
//   }

//   async displayBrnads(character:any):Promise<Observable<brandInfo>>{
//     return await this.http.post<brandInfo>(this.BaseUrl+'/brands/displayBrands',{character:character}).
//     pipe(catchError(this.handleError));
//   }
// }
