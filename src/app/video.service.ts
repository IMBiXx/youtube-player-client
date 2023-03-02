import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, Subject, tap } from 'rxjs';
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
  private currentVideoSubject = new Subject<Video | undefined>();
  private historySubject = new Subject<Video[]>();
  private bookmarksSubject = new Subject<Video[]>();
  history: Video[] = [];
  bookmarks: Video[] = [];
  constructor(private http: HttpClient) {
    this.fetchHistory().subscribe();
    this.fetchBookmarks().subscribe();
  }
  fetchHistory(): Observable<Video[]> {
    return this.http.get<Video[]>(this.historyUrl).pipe(
      tap((history) => {
        console.log('fetched history', history);
        this.history = history;
        this.historySubject.next(history);
      }),
      catchError(this.handleError<Video[]>('fetchHistory', []))
    );
  }
  fetchBookmarks(): Observable<Video[]> {
    return this.http.get<Video[]>(this.bookmarksUrl).pipe(
      tap((bookmarks) => {
        console.log('fetched bookmarks', bookmarks);
        this.bookmarks = bookmarks;
        this.bookmarksSubject.next(bookmarks);
      }),
      catchError(this.handleError<Video[]>('fetchBookmarks', []))
    );
  }
  getCurrentVideo(): Observable<Video | undefined> {
    return this.currentVideoSubject.asObservable();
  }
  getHistory(): Observable<Video[]> {
    console.log('getHistory', this.history);
    return this.historySubject.asObservable();
  }
  getBookmarks(): Observable<Video[]> {
    console.log('getBookmarks', this.bookmarks);
    return this.bookmarksSubject.asObservable();
  }
  addHistory(video: Video): Observable<Video> {
    console.log('addHistory', video);
    return this.http.post<Video>(this.historyUrl, video, this.httpOptions).pipe(
      tap((newVideo: Video) => {
        console.log(`added video ${newVideo.name} to history`);
        this.currentVideoSubject.next(newVideo);
        this.history.push(newVideo);
        this.historySubject.next(this.history);
      }),
      catchError(this.handleError<Video>('addHistory'))
    );
  }
  addBookmark(video: Video): Observable<Video> {
    return this.http
      .post<Video>(this.bookmarksUrl, video, this.httpOptions)
      .pipe(
        tap((newBookmark) => {
          console.log(`added video ${video.name} to bookmarks`);
          this.bookmarks.push(newBookmark);
          this.bookmarksSubject.next(this.bookmarks);
        }),
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
