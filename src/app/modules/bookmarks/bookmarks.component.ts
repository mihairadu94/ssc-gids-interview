import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BookmarkService } from '../../services/bookmark/bookmark.service';
import { EditBookmarkDialogComponent } from '../edit-bookmark-dialog/edit-bookmark-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RemoveBookmarkDialogComponent } from '../remove-bookmark-dialog/remove-bookmark-dialog.component';
import { AddBookmarkDialogComponent } from '../add-bookmark-dialog/add-bookmark-dialog.component';
import { LocalStorageService } from '../../services/local-storage/local-storage-service.service';

interface Bookmark {
  id: number;
  title: string;
  url: string;
  timestamp: string;
  category: "today" | "yesterday" | "older";
}

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})

export class BookmarksComponent implements OnInit {
  bookmarks: Bookmark[] = [];
  todayBookmarks: Bookmark[] = [];
  yesterdayBookmarks: Bookmark[] = [];
  olderBookmarks: Bookmark[] = [];

  searchQuery: string = '';

  constructor(
    private bookmarkService: BookmarkService,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.fetchBookmarks();
    this.categorizeBookmarks();

    this.bookmarkService.searchQuery$.subscribe((query) => {
      this.searchBookmarks(query);
    });
  }

  private categorizeBookmarks(): void {
    this.todayBookmarks = [];
    this.yesterdayBookmarks = [];
    this.olderBookmarks = [];

    this.bookmarks.forEach(bookmark => {
      if (bookmark.category === 'today') {
        this.todayBookmarks.push(bookmark);
      } else if (bookmark.category === 'yesterday') {
        this.yesterdayBookmarks.push(bookmark);
      } else if (bookmark.category === 'older') {
        this.olderBookmarks.push(bookmark);
      }
    });
  }

  fetchBookmarks(): void {
    this.localStorageService.getBookmarks().subscribe((res: any) => {
      console.log('bookmarks: ', res);
    // this.bookmarkService.getBookmarks().subscribe((res: any) => {
      this.bookmarks = res;
      this.categorizeBookmarks();
    });
  }

  openEditModal(bookmark: Bookmark) {
    const dialogRef = this.dialog.open(EditBookmarkDialogComponent, {
      width: '300px',
      data: bookmark,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.fetchBookmarks();
      }
    });
  }

  openRemoveDialog(bookmark: Bookmark) {
    const dialogRef = this.dialog.open(RemoveBookmarkDialogComponent, {
      width: '300px',
      data: bookmark,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.fetchBookmarks();
      }
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddBookmarkDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.fetchBookmarks();
      }
    });
  }

  searchBookmarks(query: string): void {
    // If the query is empty, reset the categorized bookmarks
    if (!query.trim()) {
      this.categorizeBookmarks(); // Restore the original categorized bookmarks
      return;
    }
  
    const lowerCaseQuery = query.toLowerCase();
  
    this.todayBookmarks = this.bookmarks
      .filter(bookmark => bookmark.category === 'today')
      .filter(bookmark => 
        bookmark.title.toLowerCase().includes(lowerCaseQuery) ||
        bookmark.url.toLowerCase().includes(lowerCaseQuery)
      );
  
    this.yesterdayBookmarks = this.bookmarks
      .filter(bookmark => bookmark.category === 'yesterday')
      .filter(bookmark => 
        bookmark.title.toLowerCase().includes(lowerCaseQuery) ||
        bookmark.url.toLowerCase().includes(lowerCaseQuery)
      );
  
    this.olderBookmarks = this.bookmarks
      .filter(bookmark => bookmark.category === 'older')
      .filter(bookmark => 
        bookmark.title.toLowerCase().includes(lowerCaseQuery) ||
        bookmark.url.toLowerCase().includes(lowerCaseQuery)
      );
  }

}