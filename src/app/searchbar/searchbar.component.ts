import { Component } from '@angular/core';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent {
  constructor(private videoService: VideoService) {}
  search(link: string): void {
    console.log(link);
    this.videoService
      .addHistory({
        name: link,
        url: this.transformUrlToEmbedUrl(link),
      })
      .subscribe();
  }
  transformUrlToEmbedUrl(url: string): string {
    const embedUrl = url.replace('watch?v=', 'embed/');
    return embedUrl;
  }
}
