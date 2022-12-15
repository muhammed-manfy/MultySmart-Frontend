import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { extend } from 'jquery';
import { catchError, Observable } from 'rxjs';
import { brandInfo} from 'src/app/Models/Brand.model';
import { BasicApiService } from '../Basic/basic-api.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService extends BasicApiService {

  constructor( private http:HttpClient) {
    super();
   }

  async createBrand(brandData:any):Promise<Observable<brandInfo>>{
    return await this.http.post<brandInfo>(this.BaseUrl+'/brands/create',brandData).
    pipe(catchError(this.handleError));
  }

  async getBrands(){
    return await this.http.get<brandInfo>(this.BaseUrl+'/brands').pipe(catchError(this.handleError));
  }
  async deleteBrand(id:any){
    return await this.http.delete(this.BaseUrl+'/brands/delete/'+id).pipe(catchError(this.handleError));
  }

  async updateBrand(id:String,brandData:any):Promise<Observable<brandInfo>>{
    return await this.http.put<brandInfo>(this.BaseUrl+'/brands/update/'+id,brandData)
    .pipe(catchError(this.handleError));
  }
}
