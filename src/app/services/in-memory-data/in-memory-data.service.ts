import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Bookmark } from '../../interfaces/bookmark.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
  
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
  
    const bookmarks: Bookmark[] = [
       // Today
      { id: 1, title: 'Angular Docs 1', url: 'https://angular.io', timestamp: today.toISOString() },
      { id: 2, title: 'Angular Docs 2', url: 'https://angular.io', timestamp: today.toISOString() },
      { id: 3, title: 'Angular Docs 3', url: 'https://angular.io', timestamp: today.toISOString() },

      // Yesterday
      { id: 4, title: 'MDN 1', url: 'https://developer.mozilla.org', timestamp: yesterday.toISOString() }, 
      { id: 5, title: 'MDN', url: 'https://developer.mozilla.org', timestamp: yesterday.toISOString() },

      // Older
      { id: 6, title: 'Stack Overflow', url: 'https://stackoverflow.com', timestamp: '2024-11-20T09:00:00Z' },
    ];

    // Type for categorizedBookmarks
    const categorizedBookmarks: { [key: string]: Bookmark[] } = {
      today: [],
      yesterday: [],
      older: [],
    };

    // Categorize the bookmarks
    bookmarks.forEach(bookmark => {
      const bookmarkDate = new Date(bookmark.timestamp);
      let category: "today" | "yesterday" | "older";

      if (bookmarkDate >= today) {
        category = "today";
      } else if (bookmarkDate >= yesterday) {
        category = "yesterday";
      } else {
        category = "older";
      }

      // Push the bookmark into the correct category
      categorizedBookmarks[category].push({ ...bookmark, category });
    });
  
    return { bookmarks: categorizedBookmarks };
  }

  // Method to handle the update of a bookmark
  updateBookmark(id: number, changes: Partial<Bookmark>): Observable<Bookmark> {
    const categorizedBookmarks = this.createDb().bookmarks;

    // Find all bookmarks across categories
    for (let category in categorizedBookmarks) {
      const bookmarkIndex = categorizedBookmarks[category].findIndex(b => b.id === id);
      
      if (bookmarkIndex !== -1) {
        const updatedBookmark = { ...categorizedBookmarks[category][bookmarkIndex], ...changes };

        // Update the bookmark
        categorizedBookmarks[category][bookmarkIndex] = updatedBookmark;
        
        return of(updatedBookmark);  // Return the updated bookmark as an Observable
      }
    }

    throw new Error('Bookmark not found');
  }
  
}