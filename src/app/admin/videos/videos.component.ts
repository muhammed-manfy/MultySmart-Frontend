import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { VideoService } from 'src/app/API Services/Video/video.service';
import { DeleteVideoComponent } from 'src/app/Dialogs/Videos/delete-video/delete-video.component';
import { videoInfo } from 'src/app/Models/Video.model';

@Component({
  selector: 'app-admin-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class AdminVideosComponent implements OnInit {
  videosRecived:any;
  videosList = Array<videoInfo>();
  constructor(private videoService:VideoService
    , public dialog:MatDialog
    , public router:Router) { }

  async  ngOnInit():Promise <void> {
    await (await this.videoService.getVideos()).subscribe((videos:videoInfo)=>{
      this.videosRecived = videos;
      this.videosList = this.videosRecived.map((video:any)=>{
        return video;
      });
      console.log(videos);
    });
  }
  deleteVideo(id:any){
    this.dialog.open(DeleteVideoComponent,{
      data:{
        id:id
      },
      width:"300px"
    })
  }
  editVideo(video:any){
    this.router.navigateByUrl('dashboard/edit-video',{state:video});
  }
}
