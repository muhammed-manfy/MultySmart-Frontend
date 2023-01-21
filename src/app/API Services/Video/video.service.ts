import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { videoInfo } from 'src/app/Models/Video.model';
import { BasicApiService } from '../Basic/basic-api.service';

@Injectable({
  providedIn: 'root'
})
export class VideoService extends BasicApiService {

  constructor( private http:HttpClient) {
    super();
  }

  async createVideo(video:any):Promise<Observable<videoInfo>>{
    return await this.http.post<videoInfo>(this.BaseUrl+'/videos/create',video)
    .pipe(catchError(this.handleError));
  }
  async getVideos(){
    return await this.http.get<videoInfo>(this.BaseUrl+'/videos').
    pipe(catchError(this.handleError));
  }
  async deleteVideo(id:any){
    return await this.http.delete(this.BaseUrl+'/videos/delete/'+id).
    pipe(catchError(this.handleError));
  }
  async updateVideo(id:any,videoData:any):Promise<Observable<videoInfo>>{
    return await this.http.put<videoInfo>(this.BaseUrl+'/videos/update/'+id ,videoData).
    pipe(catchError(this.handleError));
  }

  async getLastVideos(){
    return await this.http.get<videoInfo>(this.BaseUrl+'/videos/lastVideos')
    .pipe(catchError(this.handleError));
  }
}
