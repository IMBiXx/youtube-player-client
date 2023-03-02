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
    // check if link is a valid youtube link
    const url = this.transformUrlToEmbedUrl(link);
    if (url) {
      this.videoService
        .addHistory({
          name: link,
          url: this.transformUrlToEmbedUrl(link),
        })
        .subscribe();
    }
  }
  transformUrlToEmbedUrl(url: string): string {
    // regex to check if url is a valid youtube link
    const urlRegex = /youtube\.com\/watch/;
    if (!urlRegex.test(url)) {
      return '';
    }
    const embedUrl = url.replace('watch?v=', 'embed/');
    const embedUrlWithoutArgs = embedUrl.match(/(.*)&.*/)?.[1] || embedUrl;
    return embedUrlWithoutArgs;
  }
}
