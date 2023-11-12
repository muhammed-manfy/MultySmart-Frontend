import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/API Services/Blog/blog-service.service';
import { ProjectsService } from 'src/app/API Services/Project/projects.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit {
  routingInfo: any;
  idProject: any;
  videoUploaded!: File;
  messageReceived: any;
  blogForm: FormGroup;
  blogParams: any;
  blogInfo: any;
  updateBlogApiResponse: any;
  constructor(public snackBar: MatSnackBar, public router: ActivatedRoute,
    private formBuilder: FormBuilder, private blogServie: BlogService, private route: Router) {
    this.blogForm = formBuilder.group({
      blogTitle: ['', [Validators.required]],
      description: ['', [Validators.required]],
      video: ['', [Validators.required]]
    });
  }

  async ngOnInit(): Promise<void> {
    this.blogParams = this.router.snapshot.queryParamMap.get('blog');
    this.blogInfo = JSON.parse(this.blogParams);
  }

  uploadVideo(event: any) {
    const file = event.target.files[0];
    this.videoUploaded = file;
  }

  validationNotification() {
    this.snackBar.open("Can't Update, fill your fileds", "Close", {
      horizontalPosition: "end",
      verticalPosition: "bottom",
      duration: 4 * 1000,
      panelClass: ['error']
    });
  }

  async blogSubmit(event: any) {
    if (!this.blogForm.valid)
      this.validationNotification();
    else {
      var title = this.blogForm.get('blogTitle')?.value;
      var description = this.blogForm.get('description')?.value;
      var tag = event.target.tag.value;
      var category = event.target.category.value;

      const blogData = new FormData();
      blogData.append("title", title);
      blogData.append("description", description);
      blogData.append("tag", tag);
      blogData.append("category", category);
      blogData.append("video", this.videoUploaded);

      (await this.blogServie.updateBlog(blogData, this.blogInfo._id)).subscribe(response => {
        this.updateBlogApiResponse = response;
        this.snackBar.open('A blog updated successfully', "Ok", {
          horizontalPosition: "end",
          verticalPosition: "bottom",
          duration: 4 * 1000,
          panelClass: ['success']
        });
        this.route.navigateByUrl('/dashboard/blogs');
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

  CATEGORIES = ['SOUND SYSTEM', 'CCTV', 'WIFI', 'AC CONTROLS', 'CURATIONS CONTROLS', 'LIGTHING CONTROLS', 'THEREATERS CINEMA'];

  TAGS = ['NETWORKING', 'SMART HOME', 'CCTV', 'GATEWAIES'];

}
