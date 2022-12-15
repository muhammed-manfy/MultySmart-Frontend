import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { VideoService } from 'src/app/API Services/Video/video.service';

@Component({
  selector: 'app-update-video',
  templateUrl: './update-video.component.html',
  styleUrls: ['./update-video.component.scss']
})
export class UpdateVideoComponent implements OnInit {
  messageResponse: any;
  video!:File;
  idVideo:any;
  routingInfo:any;
  constructor(private snackBar: MatSnackBar
    , private videoService: VideoService
    , public router:Router) {
      this.routingInfo = this.router.getCurrentNavigation()?.extras.state;
      this.idVideo = this.routingInfo._id;
  }

  ngOnInit(): void {
  }

  validationNotification() {
    this.snackBar.open("Can't Update Data","Close",{
      horizontalPosition: "end",
      verticalPosition: "bottom",
      duration: 4 * 1000,
      panelClass:['validationSnackBar']
    })
  }

  async submitForm(event:any) {

    const title = (event.target.title.value);
    const description =(event.target.description.value);
    this.video = (event.target.video.files[0]);
    if (!title || !description || !this.video)
      this.validationNotification();
    else {
      const formData  = new FormData();
      formData.append("title",title);
      formData.append("description",description);
      formData.append("video",this.video);
       (await this.videoService.updateVideo(this.idVideo,formData)).subscribe(response => {
        this.messageResponse = response;
        this.snackBar.open(this.messageResponse.message, "Ok", {
          horizontalPosition: "end",
          verticalPosition: "bottom",
          duration: 4 * 1000,
          panelClass: ['successSnackBar']
        });
          this.router.navigate(['dashboard/videos']);
      }, (err) => {
        this.snackBar.open("Some thing is happend in server plesae try agin!", "Ok", {
          horizontalPosition: "end",
          verticalPosition: "bottom",
          duration: 4 * 1000,
          panelClass: ['validationSnackBar']
        });
      });
    }
  }
}
