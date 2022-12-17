import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { projectInfo } from 'src/app/Models/Project.model';
import { BasicApiService } from '../Basic/basic-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService extends BasicApiService {

  constructor(private http: HttpClient) {
    super();
  }
  async createProject(project: any): Promise<Observable<projectInfo>> {
    return (await this.http.post<projectInfo>(this.BaseUrl + '/projects/create', project)).
      pipe(catchError(this.handleError));
  }
  getProjects() {
    return this.http.get<projectInfo>(this.BaseUrl + '/projects')
      .pipe(catchError(this.handleError))
  }
  async deleteProject(id:any){
  return await this.http.delete(this.BaseUrl+'/projects/delete/'+id)
  .pipe(catchError(this.handleError));
  }
  async updateProject(id:any,projectData:any):Promise<Observable<projectInfo>>{
    return await this.http.put<projectInfo>(this.BaseUrl+'/projects/update/'+id,projectData)
    .pipe(catchError(this.handleError));
  }
}
