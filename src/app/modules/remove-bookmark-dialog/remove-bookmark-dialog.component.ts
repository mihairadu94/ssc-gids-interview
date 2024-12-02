import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookmarkService } from '../../services/bookmark/bookmark.service';
import { Bookmark } from '../../interfaces/bookmark.interface';
import { Locals } from 'express';
import { LocalStorageService } from '../../services/local-storage/local-storage-service.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-remove-bookmark-dialog',
  templateUrl: './remove-bookmark-dialog.component.html',
  styleUrl: './remove-bookmark-dialog.component.scss'
})
export class RemoveBookmarkDialogComponent {

  bookmark!: Bookmark;

  constructor(
    private bookmarkService: BookmarkService,
    private localStorageService: LocalStorageService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<RemoveBookmarkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.bookmark = data;
  }

  onRemove(id: any): void {
    this.localStorageService.deleteBookmark(id);
    this.dialogRef.close(id);
    this.showSnackbar();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  showSnackbar() {
    this.snackbarService.openSnackBar('Bookmark successfully removed', 2000, 'Dismiss');
  }

}
