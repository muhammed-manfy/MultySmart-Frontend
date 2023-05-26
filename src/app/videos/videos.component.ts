import { Component, OnInit } from '@angular/core';
import { VideoService } from '../API Services/Video/video.service';
import { videoInfo } from '../Models/Video.model';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  vidoesReceived:any;
  videosList = Array<videoInfo>();
  constructor(private videoService:VideoService) {}

  async ngOnInit():Promise <void> {
    (await this.videoService.getLastVideos()).subscribe((videos:videoInfo)=>{
      this.vidoesReceived = videos;
      this.videosList = this.vidoesReceived.map((video:any)=>{
        return video;
      });
      console.log(videos);
    });
  }
}
