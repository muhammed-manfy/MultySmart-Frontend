import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/API Services/Blog/blog-service.service';
import { ProjectsService } from 'src/app/API Services/Project/projects.service';
import { DeleteProjectComponent } from 'src/app/Dialogs/Projects/delete-project/delete-project.component';
import { Blog } from 'src/app/Models/Blog.model';

@Component({
  selector: 'admin-projects',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class AdminBlogsComponent implements OnInit {
  pageEvent!: PageEvent;
  blogsResponse: any;
  pageSize = 6;
  currentPage = 0;
  totalBlogs: any;
  blogsList = Array<Blog>();
  messageReplayOnDelete: any;
  constructor(private blogService: BlogService,
    public dialog: MatDialog, public router: Router) { }

  ngOnInit() {
    this.getBlogsPagination();
  }
  async getBlogsPagination() {
    (await this.blogService.getBlogsPagination(this.pageSize,this.currentPage)).subscribe((blogs: Blog) => {
      this.blogsResponse = blogs;
      this.blogsList = this.blogsResponse.data.map((blog: Blog) => {
        return blog;
      });
      this.totalBlogs = this.blogsResponse.totalBlogs;
    });
  }
  handlePagination(event: PageEvent) {
    var pageNumber = event.pageIndex;
    this.currentPage = pageNumber;
    this.getBlogsPagination();
  }

  updateBlog(blog:any){
    this.router.navigate(['/dashboard/edit-project'],{
      queryParams:{
        blog:blog
      }
    });
  }
  deleteBlog(blog_id:any){
    this.dialog.open(DeleteProjectComponent, {
      data: {
        id: blog_id
      },
      width: '300px',
    });
  }
}
