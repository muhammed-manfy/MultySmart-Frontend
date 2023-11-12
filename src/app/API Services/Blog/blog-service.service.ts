import { Injectable } from '@angular/core';
import { BasicApiService } from '../Basic/basic-api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Blog } from 'src/app/Models/Blog.model';
@Injectable({
  providedIn: 'root'
})
export class BlogService extends BasicApiService{

  constructor(private http:HttpClient) {
    super();
  }

  async createBlog(blogData:any):Promise<Observable<Blog>> {
    return await this.http.post<Blog>(this.BaseUrl + "/blogs/create", blogData, {headers:this.adminHeaders});
  }

  async getBlogs():Promise<Observable<Blog>>{
    return await this.http.get<Blog>(this.BaseUrl+'/blogs/');
  }

  async getBlogsPagination(pageSize:Number,currentPage:Number):Promise<Observable<Blog>>{
    return await this.http.post<Blog>(this.BaseUrl+'/blogs/pagination',{
      pageSize:pageSize,
      currentPage:currentPage
    },{headers:this.adminHeaders});
  }

  async displayBlogs(pageSize:any,currentPage:any,category:any,tag:any):Promise<Observable<Blog>>{
    return await this.http.post<Blog>(this.BaseUrl+'/blogs/displayBlogs',{
      category:category,
      tag:tag,
      pageSize:pageSize,
      currentPage:currentPage
    });
  }

  async updateBlog(blogData: any, blog_id:any){
    return await this.http.put<Blog>(this.BaseUrl+'/blogs/update/'+blog_id,blogData,{
      headers:this.adminHeaders
    });
  }

  async deleteBlog(blog_id: any){
    return await this.http.delete<Blog>(this.BaseUrl+'/blogs/delete/'+blog_id,{headers:this.adminHeaders})
  }
  
  async likeBlogSave(blogId:any){
    return await this.http.get<Blog>(this.BaseUrl+'/blogs/register/like/' + blogId);
  }
}
