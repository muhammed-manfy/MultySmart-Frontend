import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { offersInfo } from 'src/app/Models/Offer.model';
import { BasicApiService } from '../Basic/basic-api.service';

@Injectable({
  providedIn: 'root'
})
export class OfferService extends BasicApiService {

  constructor( private http:HttpClient ) {
    super();
   }

  async createOffer(offerData:any):Promise<Observable<offersInfo>>{
    return await this.http.post<offersInfo>(this.BaseUrl+'/offers/create',offerData).
        pipe(catchError(this.handleError));
  }
  async getOffers(){
    return await this.http.get<offersInfo>(this.BaseUrl+'/offers')
      .pipe(catchError(this.handleError));
  }

  async deleteOffer(id:any){
    return await this.http.delete(this.BaseUrl+'/offers/delete/'+id)
      .pipe(catchError(this.handleError));
  }
  async updateOffer(id:any,offerData:any):Promise<Observable<offersInfo>>{
    return await this.http.put<offersInfo>(this.BaseUrl+'/offers/update/'+id,offerData)
    .pipe(catchError(this.handleError));
  }
}
