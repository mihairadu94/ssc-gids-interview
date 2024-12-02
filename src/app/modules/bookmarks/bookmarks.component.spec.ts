import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookmarksComponent } from './bookmarks.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { BookmarkComponent } from './bookmark/bookmark.component';

describe('BookmarksComponent', () => {
  let component: BookmarksComponent;
  let fixture: ComponentFixture<BookmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookmarksComponent, BookmarkComponent],
      imports: [
        HttpClientModule,
        MatIconModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
