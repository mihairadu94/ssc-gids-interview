import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookmarkService } from '../../services/bookmark/bookmark.service';
import { InMemoryDataService } from '../../services/in-memory-data/in-memory-data.service';
import { LocalStorageService } from '../../services/local-storage/local-storage-service.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-edit-bookmark-dialog',
  templateUrl: './edit-bookmark-dialog.component.html',
  styleUrls: ['./edit-bookmark-dialog.component.scss']
})
export class EditBookmarkDialogComponent {
  bookmarkForm: FormGroup;

  constructor(
    private bookmarkService: BookmarkService,
    private dbService: InMemoryDataService,
    private localStorageService: LocalStorageService,
    private snackbarService: SnackbarService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditBookmarkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize the form group with the bookmark data
    this.bookmarkForm = this.fb.group({
      title: [this.data?.title || '', Validators.required],
      url: [this.data?.url || '', [Validators.required, Validators.pattern(/https?:\/\/.+/)]]
    });
  }

  onSave(): void {
    if (this.bookmarkForm.valid) {
      // this.bookmarkService.updateBookmark(this.data);
      // this.dbService.updateBookmark(this.data.id, this.bookmarkForm.value);
      this.localStorageService.updateBookmark(this.data.id, this.bookmarkForm.value);
      this.dialogRef.close(this.bookmarkForm.value);
      this.showSnackbar();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  showSnackbar() {
    this.snackbarService.openSnackBar('Bookmark successfully edited', 2000, 'Dismiss');
  }
  
}