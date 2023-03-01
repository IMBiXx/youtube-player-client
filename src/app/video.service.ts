import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Video } from './video';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private apiUrl = 'http://localhost:8000';
  private historyUrl = this.apiUrl + '/history';
  private bookmarksUrl = this.apiUrl + '/bookmarks';
  httpOptions = {
    headers: new HttpHeaders().set('content-type', 'application/json'),
  };
  currentVideo: Video | undefined;
  constructor(private http: HttpClient) {}

  getCurrentVideo(): Observable<Video | undefined> {
    return this.currentVideo ? of(this.currentVideo) : of(undefined);
  }
  getHistory(): Observable<Video[]> {
    return this.http.get<Video[]>(this.historyUrl).pipe(
      tap((_) => console.log('fetched history')),
      catchError(this.handleError<Video[]>('getHistory', []))
    );
  }
  getBookmarks(): Observable<Video[]> {
    return this.http.get<Video[]>(this.bookmarksUrl).pipe(
      tap((_) => console.log('fetched bookmarks')),
      catchError(this.handleError<Video[]>('getBookmarks', []))
    );
  }
  addHistory(video: Video): Observable<Video> {
    console.log('addHistory', video);
    return this.http.post<Video>(this.historyUrl, video, this.httpOptions).pipe(
      tap((newVideo: Video) => {
        console.log(`added video ${newVideo.name} to history`);
        this.currentVideo = newVideo;
      }),
      catchError(this.handleError<Video>('addHistory'))
    );
  }
  addBookmarks(video: Video): Observable<Video> {
    return this.http
      .post<Video>(this.bookmarksUrl, video, this.httpOptions)
      .pipe(
        tap((_) => console.log(`added video ${video.name} to bookmarks`)),
        catchError(this.handleError<Video>('addBookmarks'))
      );
  }
  private log(message: string) {
    console.log(`VideoService: ${message}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
