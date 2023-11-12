import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/API Services/Blog/blog-service.service';
import { ProjectsService } from 'src/app/API Services/Project/projects.service';
import { ShowProjevtNotificationComponent } from 'src/app/ValidatorNotification/ValidatorProject/show-projevt-notification/show-projevt-notification.component';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {
  blogForm: FormGroup;
  videoUploaded!: File;
  apiResponse: any;
  token: any;
  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar
    , private blogService: BlogService, private router:Router) {
    this.blogForm = formBuilder.group({
      blogTitle: ['', [Validators.required]],
      description: ['', [Validators.required]],
      video: ['', [Validators.required]]
    })
  }
  get title() {
    return this.blogForm.get('blogTitle')?.valid;
  }
  get description() {
    return this.blogForm.get('description')?.valid;
  }
  get video() {
    return this.blogForm.get('video')?.valid;
  }

  ngOnInit(): void {
  }

  validationNotification() {
    this.snackBar.openFromComponent(ShowProjevtNotificationComponent, {
      data: {
        title: this.title,
        description: this.description,
        video: this.video
      },
      horizontalPosition: "end",
      verticalPosition: "bottom",
      duration: 3 * 1000
    })
  }
  uploadVideo(event: any) {
    const file = event.target.files[0];
    this.videoUploaded = file;
  }

  async blogSubmit(event: any) {
    if (!this.blogForm.valid)
      this.validationNotification();
    else {
      let title = this.blogForm.get('blogTitle')?.value;
      let description = this.blogForm.get('description')?.value;
      let category = event.target.category.value;
      let tag = event.target.tag.value;
      const blogData = new FormData();
      blogData.append('title', title);
      blogData.append('description', description);
      blogData.append('category', category);
      blogData.append('tag', tag);
      blogData.append('video', this.videoUploaded);

      (await this.blogService.createBlog(blogData)).subscribe(response => {
        this.apiResponse = response;
        this.snackBar.open(this.apiResponse.message, "Ok", {
          duration: 3 * 1000,
          horizontalPosition: "end",
          verticalPosition: "bottom",
          panelClass: ['success']
        });
        this.router.navigateByUrl("/dashboard/blogs");
      }, (error) => {
        this.snackBar.open(error.error.message, "Close", {
          duration: 3 * 1000,
          horizontalPosition: "end",
          verticalPosition: "bottom",
          panelClass: ['error']
        });
      });
    }
  }


  CATEGORIES = ['SOUND SYSTEM', 'CCTV', 'WIFI', 'AC CONTROLS', 'CURATIONS CONTROLS', 'LIGTHING CONTROLS', 'THEREATERS CINEMA'];

  TAGS = ['NETWORKING', 'SMART HOME', 'CCTV', 'GATEWAIES'];

}
