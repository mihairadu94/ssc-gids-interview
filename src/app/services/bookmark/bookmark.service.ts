import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Bookmark } from '../../interfaces/bookmark.interface';
import { API_URLS } from '../../common/constants/api-urls';

@Injectable({
  providedIn: 'root',
})

export class BookmarkService {
  private apiUrl = API_URLS.BOOKMARKS;

  private searchQuerySource = new Subject<string>();
  searchQuery$ = this.searchQuerySource.asObservable();
  
  constructor(private http: HttpClient) {}

  getBookmarks(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(this.apiUrl);
  }

  addBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(this.apiUrl, bookmark);
  }

  deleteBookmark(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.put<Bookmark>(`${this.apiUrl}/${bookmark.id}`, bookmark);
  }

  updateSearchQuery(query: string): void {
    this.searchQuerySource.next(query);
  }
  
}