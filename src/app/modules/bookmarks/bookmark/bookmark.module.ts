import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmarkComponent } from './bookmark.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [BookmarkComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [BookmarkComponent],
})

export class BookmarkModule { }
