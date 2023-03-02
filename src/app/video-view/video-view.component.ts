import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Video } from '../video';
import { VideoService } from '../video.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css'],
})
export class VideoViewComponent implements OnDestroy {
  currentVideo: Video | undefined;
  subscription: Subscription | undefined;
  safeURL: SafeResourceUrl | undefined;
  constructor(
    private videoService: VideoService,
    private _sanitizer: DomSanitizer
  ) {
    this.subscription = this.videoService.getCurrentVideo().subscribe({
      next: (video) => {
        this.currentVideo = video;
        this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(
          video!.url
        );
      },
      error: (error) => {
        console.error('error', error);
      },
    });
  }
  addToBookmarks(video: Video): void {
    if (!this.videoService.bookmarks.find((v) => v.url === video.url)) {
      this.videoService.addBookmark(video).subscribe();
    }
  }
  ngOnDestroy(): void {
    console.log('destroy video view');
    this.subscription?.unsubscribe();
  }
}
