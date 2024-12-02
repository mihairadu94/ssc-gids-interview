import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkComponent } from './bookmark.component';
import { MatIconModule } from '@angular/material/icon';

describe('BookmarkComponent', () => {
  let component: BookmarkComponent;
  let fixture: ComponentFixture<BookmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookmarkComponent],
      imports: [MatIconModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
