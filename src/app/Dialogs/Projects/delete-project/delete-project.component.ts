import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlogService } from 'src/app/API Services/Blog/blog-service.service';
import { ProjectsService } from 'src/app/API Services/Project/projects.service';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.scss']
})
export class DeleteProjectComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public snackBar: MatSnackBar,
    private blogService: BlogService) { }

  // variables initalization
  deleteBlogApiResponse: any;

  ngOnInit(): void {

  }

  async deleteRecord(blog_id: any) {
    (await this.blogService.deleteBlog(blog_id)).subscribe(response => {
      this.deleteBlogApiResponse = response;
      this.snackBar.open(this.deleteBlogApiResponse.message, "Ok", {
        horizontalPosition: "end",
        verticalPosition: "bottom",
        duration: 4 * 1000,
        panelClass: ['success']
      });
      window.location.reload();
    }, (error) => {
      this.snackBar.open(error.error.message, "Close", {
        horizontalPosition: "end",
        verticalPosition: "bottom",
        duration: 4 * 1000,
        panelClass: ['error']
      });
    });
  }
}
