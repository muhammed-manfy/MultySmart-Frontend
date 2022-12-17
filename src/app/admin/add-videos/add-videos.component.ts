import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VideoService } from 'src/app/API Services/Video/video.service';
import { ShowVideoNotificatoinsComponent } from 'src/app/ValidatorNotification/ValidatorVideo/show-video-notificatoins/show-video-notificatoins.component';

@Component({
  selector: 'app-add-videos',
  templateUrl: './add-videos.component.html',
  styleUrls: ['./add-videos.component.scss']
})
export class AddVideosComponent implements OnInit {
  addVideoForm: FormGroup;
  messageResponse: any;
  video!:File;
  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private videoService: VideoService) {
    this.addVideoForm = this.formBuilder.group({
      videoTitle: ['', [Validators.required]],
      description: ['', [Validators.required]],
      videoUrl: ['', [Validators.required]]
    })
  }

  get videoTitle() {
    return this.addVideoForm.get('videoTitle')?.valid;
  }
  get description() {
    return this.addVideoForm.get('description')?.valid;
  }
  get videoUrl() {
    return this.addVideoForm.get('videoUrl')?.valid;
  }
  ngOnInit(): void {
  }
  validationNotification() {
    this.snackBar.openFromComponent(ShowVideoNotificatoinsComponent, {
      data: {
        title: this.videoTitle,
        description: this.description,
        videoUrl: this.videoUrl
      },
      horizontalPosition: "end",
      verticalPosition: "bottom",
      duration: 4 * 1000
    })
  }

  uploadVideo(event:any){
    const file = (event.target.files[0]);
    this.video = file;
  }

  async submitForm(event:any) {

    if (!this.addVideoForm.valid)
      this.validationNotification();
    else {
      let title =this.addVideoForm.value.videoTitle;
      let description =this.addVideoForm.value.description;
      const formData  = new FormData();
      formData.append("title",title);
      formData.append("description",description);
      formData.append("video",this.video);

      await (await this.videoService.createVideo(formData)).subscribe(response => {
        this.messageResponse = response;
        this.snackBar.open(this.messageResponse.message, "Ok", {
          horizontalPosition: "end",
          verticalPosition: "bottom",
          duration: 4 * 1000,
          panelClass: ['successSnackBar']
        });

      }, (err) => {
        this.snackBar.open("Some thing is happend in server plesae try agin!", "Ok", {
          horizontalPosition: "end",
          verticalPosition: "bottom",
          duration: 4 * 1000,
          panelClass: ['validationSnackBar']
        });
      })
    }
  }
}
