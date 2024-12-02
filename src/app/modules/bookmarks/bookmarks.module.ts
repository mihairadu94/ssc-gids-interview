import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmarksComponent } from './bookmarks.component';
import { BookmarkModule } from './bookmark/bookmark.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { EditBookmarkDialogComponent } from '../edit-bookmark-dialog/edit-bookmark-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BookmarkComponent } from './bookmark/bookmark.component';

@NgModule({
  declarations: [
    BookmarksComponent,
    EditBookmarkDialogComponent
  ],
  imports: [
    CommonModule,
    BookmarkModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class BookmarksModule { }