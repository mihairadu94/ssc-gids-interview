import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BookmarksComponent } from './modules/bookmarks/bookmarks.component';
import { BookmarkService } from './services/bookmark/bookmark.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ssc-gids-interview';

  searchForm: FormGroup;

  @ViewChild(BookmarksComponent) bookmarksComponent!: BookmarksComponent;

  constructor(
    private fb: FormBuilder, 
    private bookmarkService: BookmarkService
  ) {
    this.searchForm = this.fb.group({
      searchQuery: ['']
    });
  }

  onSearch(): void {
    const query = this.searchForm.get('searchQuery')?.value || '';
    console.log('Search query:', query);
    this.bookmarkService.updateSearchQuery(query);
  }

  onUserTyping(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    
    if (!inputValue) {
      this.bookmarkService.updateSearchQuery('');
    }
  }
}