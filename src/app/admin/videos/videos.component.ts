import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/API Services/Video/video.service';
import { videoInfo } from 'src/app/Models/Video.model';

@Component({
  selector: 'app-admin-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class AdminVideosComponent implements OnInit {
  videosRecived:any;
  videosList = Array<videoInfo>();
  constructor(private videoService:VideoService) { }

  async  ngOnInit():Promise <void> {
    await (await this.videoService.getVideos()).subscribe((videos:videoInfo)=>{
      this.videosRecived = videos;
      this.videosList = this.videosRecived.map((video:any)=>{
        return video;
      });
      console.log(this.videosList);
    });
  }

}
