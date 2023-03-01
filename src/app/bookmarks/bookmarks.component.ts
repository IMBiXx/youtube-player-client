import { Component } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
})
export class BookmarksComponent {
  bookmarks: Video[] = [];
  constructor(private videoService: VideoService) {}
  ngOnInit(): void {
    this.getBookmarks();
  }
  getBookmarks(): void {
    this.videoService
      .getBookmarks()
      .subscribe((bookmarks) => (this.bookmarks = bookmarks));
  }
  add(video: Video): void {
    if (!video) {
      return;
    }
    this.videoService.addBookmarks(video).subscribe((video) => {
      this.bookmarks.push(video);
    });
  }
}
