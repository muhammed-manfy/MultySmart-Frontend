import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { messageInfo } from '../../Models/Message';
import { BasicApiService } from '../Basic/basic-api.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends BasicApiService {

  constructor(private http:HttpClient) {
    super();
   }

  async createMessage(message:any):Promise<Observable<messageInfo>>{
    return await this.http.post<messageInfo>(this.BaseUrl+'/messages/create', message)
    .pipe(catchError((this.handleError)));
  }

  async getMessagesPagination(pageSize:Number,currnetPage:Number){
    return await this.http.post<messageInfo>(this.BaseUrl+'/messages/pagination',{pageSize:pageSize,currnetPage:currnetPage})
    .pipe(catchError(this.handleError));
  }

  async deleteMessage(id:any){
    return await this.http.delete(this.BaseUrl+'/messages/delete/'+id)
    .pipe(catchError(this.handleError));
  }
}
