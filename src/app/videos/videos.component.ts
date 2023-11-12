import { Component, OnInit } from '@angular/core';
import { BlogService } from '../API Services/Blog/blog-service.service';
import { Blog } from '../Models/Blog.model';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  blogApiResponse:any;
  BlogsList :Array<Blog> =[];
  category:any;
  tag:any;
  currentPage:number=0;
  pageSize:any = 2;
  totalBlogs:any ;
  BLOG_ID:any;
  screenWidth:any;
  constructor(private blogService:BlogService) {
    this.screenWidth = window.innerWidth;
    console.log(this.screenWidth)
  }

  ngOnInit(): void{
    this.displayBlogs();
  }

  async displayBlogs(){
    (await this.blogService.displayBlogs(this.pageSize,this.currentPage,this.category,this.tag)).subscribe(blogs=>{
      this.blogApiResponse = blogs;
      this.BlogsList = this.blogApiResponse.blogs.map((blog:Blog)=>{return blog;});
      this.totalBlogs = this.blogApiResponse.totalBlogs;
      console.log(this.totalBlogs,this.BlogsList,this.currentPage,this.pageSize);
    });
  }

  selectCategory(value:any){
    if(value == 'ALL')
    this.category = '';
    else
    this.category = value;
    this.displayBlogs();
  }

  selectTags(value:any){
    if(value == 'ALL')
      this.tag = '';
    else
      this.tag = value;
      this.displayBlogs();
  }


  paginationHandle(pageNumebr:any){
    this.currentPage = pageNumebr-1;
    this.displayBlogs();
  }

  async likeRegister(){
    // this.blogService.likeBlogSave()
  }

  CATEGORIES = ['ALL','SOUND SYSTEM', 'CCTV', 'WIFI', 'AC CONTROLS', 'CURATIONS CONTROLS', 'LIGTHING CONTROLS', 'THEREATERS CINEMA'];

  TAGS = ['ALL','NETWORKING', 'SMART HOME', 'CCTV', 'GATEWAIES'];

}
