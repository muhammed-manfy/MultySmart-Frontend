import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VideoService } from 'src/app/API Services/Video/video.service';

@Component({
  selector: 'app-delete-video',
  templateUrl: './delete-video.component.html',
  styleUrls: ['./delete-video.component.scss']
})
export class DeleteVideoComponent implements OnInit {

  idVideo = this.data.id;
  messageResponse: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public snackBar: MatSnackBar,
   private videoService: VideoService) { }

  ngOnInit(): void {
  }
  async deleteRecord() {
    (await this.videoService.deleteVideo(this.idVideo)).subscribe(response => {
      this.messageResponse = response;
        this.snackBar.open(this.messageResponse.message, "Ok", {
        horizontalPosition: "end",
        verticalPosition: "bottom",
        duration: 4 * 1000,
        panelClass: ['successSnackBar']
      });
      window.location.reload();
    }, (err) => {
      this.snackBar.open("Some Error is happend On Server", "Ok", {
        horizontalPosition: "end",
        verticalPosition: "bottom",
        duration: 4 * 1000,
        panelClass: ['validationSnackBar']
      });
    });
  }
}
