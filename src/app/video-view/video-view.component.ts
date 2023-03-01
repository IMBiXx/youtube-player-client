import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from '../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css'],
})
export class VideoViewComponent {
  constructor(private videoService: VideoService) {}
  currentVideo: Video | undefined;
  ngOnInit(): void {
    this.videoService.getCurrentVideo().subscribe((video) => {
      this.currentVideo = video;
    });
  }
}
