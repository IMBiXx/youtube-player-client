import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Video } from '../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
})
export class BookmarksComponent {
  bookmarks: Video[] = [];
  subscription: Subscription;
  showBookmarks = false;
  constructor(private videoService: VideoService) {
    this.subscription = this.videoService.getBookmarks().subscribe({
      next: (bookmarks) => {
        this.bookmarks = bookmarks;
      },
      error: (error) => {
        console.error('error', error);
      },
    });
  }
  playVideo(video: Video): void {
    this.videoService.addHistory(video).subscribe();
  }
  showBookmarksList(): void {
    this.showBookmarks = !this.showBookmarks;
  }
}
