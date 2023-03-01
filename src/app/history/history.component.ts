import { Component } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  history: Video[] = [];
  constructor(private videoService: VideoService) {}
  ngOnInit(): void {
    this.getHistory();
  }
  getHistory(): void {
    this.videoService
      .getHistory()
      .subscribe((history) => (this.history = history));
  }
  add(video: Video): void {
    if (!video) {
      return;
    }
    this.videoService.addHistory(video).subscribe((video) => {
      this.history.push(video);
    });
  }
}
