import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Bookmark } from '../../interfaces/bookmark.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  private storageKey = 'bookmarks';

  private defaultBookmarks: Bookmark[] = [
    // Today
    { id: 1, title: 'Angular', url: 'https://angular.dev/', timestamp: new Date().toISOString(), category: 'today' },
    { id: 2, title: 'Angular Docs', url: 'https://angular.dev/overview/', timestamp: new Date().toISOString(), category: 'today' },
    { id: 3, title: 'Angular Material', url: 'https://material.angular.io/', timestamp: new Date().toISOString(), category: 'today' },

    // Yesterday
    { id: 4, title: 'Bootstrap Flex', url: 'https://getbootstrap.com/docs/5.3/utilities/flex/', timestamp: new Date(Date.now() - 86400000).toISOString(), category: 'yesterday' },
    { id: 5, title: 'Facebook', url: 'https://www.facebook.com/', timestamp: new Date(Date.now() - 86400000).toISOString(), category: 'yesterday' },

    // Older
    { id: 6, title: 'YouTube', url: 'https://www.youtube.com/', timestamp: '2024-11-20T09:00:00Z', category: 'older' },
    { id: 7, title: 'WhatsApp', url: 'https://web.whatsapp.com/', timestamp: '2024-11-20T09:00:00Z', category: 'older' },
    { id: 8, title: 'Instagram', url: 'https://www.instagram.com/', timestamp: '2024-11-20T09:00:00Z', category: 'older' }
  ];

  constructor() {
    this.initializeBookmarks();
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  private initializeBookmarks(): void {
    if (this.isLocalStorageAvailable() && !localStorage.getItem(this.storageKey)) {
      this.saveBookmarks(this.defaultBookmarks);
    }
  }

  getBookmarks(): Observable<Bookmark[]> {
    if (this.isLocalStorageAvailable()) {
      const bookmarks = localStorage.getItem(this.storageKey);
      const parsedBookmarks = bookmarks ? JSON.parse(bookmarks) : this.defaultBookmarks;
  
      // Move bookmarks to the correct category based on timestamp
      this.updateBookmarkCategories(parsedBookmarks);
  
      return of(parsedBookmarks);
    } else {
      console.warn('localStorage is not available. Returning default bookmarks.');
      return of(this.defaultBookmarks);
    }
  }
  
  private updateBookmarkCategories(bookmarks: Bookmark[]): void {
    const now = new Date();
    const today = new Date(now.setHours(0, 0, 0, 0));  // Set time to start of today
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);  // Set to yesterday
  
    // Update each bookmark's category based on its timestamp
    bookmarks.forEach(bookmark => {
      const updatedTimestamp = new Date(bookmark.timestamp);
      let newCategory: "today" | "yesterday" | "older";
  
      if (updatedTimestamp >= today) {
        newCategory = "today";
      } else if (updatedTimestamp >= yesterday) {
        newCategory = "yesterday";
      } else {
        newCategory = "older";
      }
  
      // If the category has changed, update it
      if (newCategory !== bookmark.category) {
        bookmark.category = newCategory;
      }
    });
  
    // Save the modified bookmarks back to localStorage
    this.saveBookmarks(bookmarks);
  }

  private saveBookmarks(bookmarks: Bookmark[]): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.storageKey, JSON.stringify(bookmarks));
    } else {
      console.warn('localStorage is not available. Changes are not persisted.');
    }
  }

  addBookmark(bookmark: Bookmark): void {
    this.getBookmarks().subscribe((bookmarks) => {
      bookmarks.push(bookmark);
      this.saveBookmarks(bookmarks);
    });
  }

  updateBookmark(bookmarkId: number, updatedData: Partial<Bookmark>): void {
    this.getBookmarks().subscribe((bookmarks) => {
      let found = false;
  
      // Find the bookmark in the array
      const index = bookmarks.findIndex((b) => b.id === bookmarkId);

      if (index !== -1) {

        // Update the bookmark
        const existingBookmark = bookmarks[index];
        
        const updatedBookmark = {
          ...existingBookmark,
          ...updatedData,
          timestamp: new Date().toISOString(),  // Update timestamp to current time
        };
  
        // Determine the new category based on the updated timestamp
        const now = new Date();
        const today = new Date(now.setHours(0, 0, 0, 0));
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
  
        let newCategory: "today" | "yesterday" | "older";
        const updatedTimestamp = new Date(updatedData.timestamp || existingBookmark.timestamp);
  
        if (updatedTimestamp >= today) {
          newCategory = "today";
        } else if (updatedTimestamp >= yesterday) {
          newCategory = "yesterday";
        } else {
          newCategory = "older";
        }
  
        updatedBookmark.category = newCategory;
  
        // Replace the old bookmark with the updated one
        bookmarks[index] = updatedBookmark;
  
        // Save the updated bookmarks
        this.saveBookmarks(bookmarks);
        found = true;
      }
  
      if (!found) {
        console.warn(`Bookmark with ID ${bookmarkId} not found.`);
      }
    });
  }

  deleteBookmark(bookmarkId: number): void {
    this.getBookmarks().subscribe((bookmarks) => {
      const index = bookmarks.findIndex((b: Bookmark) => b.id === bookmarkId);
  
      if (index !== -1) {
        // Remove the bookmark from the array
        bookmarks.splice(index, 1);
        this.saveBookmarks(bookmarks);
      } else {
        console.warn(`Bookmark with ID ${bookmarkId} not found.`);
      }
    });
  }

}