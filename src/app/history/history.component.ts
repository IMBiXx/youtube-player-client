import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Video } from '../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  history: Video[] = [];
  subscription: Subscription;
  constructor(private videoService: VideoService) {
    this.subscription = this.videoService.getHistory().subscribe({
      next: (history) => {
        this.history = history;
      },
      error: (error) => {
        console.error('error', error);
      },
    });
  }
  playVideo(video: Video): void {
    this.videoService.addHistory(video).subscribe();
  }
}
