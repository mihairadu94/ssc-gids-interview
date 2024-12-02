import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookmarkService } from '../../services/bookmark/bookmark.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService } from '../../services/local-storage/local-storage-service.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-add-bookmark-dialog',
  templateUrl: './add-bookmark-dialog.component.html',
  styleUrl: './add-bookmark-dialog.component.scss'
})
export class AddBookmarkDialogComponent {
  bookmarkForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookmarkService: BookmarkService,
    private localStorageService: LocalStorageService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<AddBookmarkDialogComponent>,
  ) {
   this.createForm();
  }

  createForm(): void {
    this.bookmarkForm = this.fb.group({
      title: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern(/https?:\/\/.+/)]],
    });
  }

  onSubmit(): void {
    if (this.bookmarkForm.valid) {

      const formData = {
        ...this.bookmarkForm.value,
        timestamp: new Date().toISOString(),
        id: this.generateId(),
        category: this.setCategory(new Date().toISOString())
      };

      // this.bookmarkService.addBookmark(formData);
      this.localStorageService.addBookmark(formData);
      this.dialogRef.close(formData);
      this.showSnackbar();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private generateId(): number {
    return Math.floor(Math.random() * 100000);
  }

  setCategory(timestamp: string): "today" | "yesterday" | "older" {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
  
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
  
    const bookmarkDate = new Date(timestamp);
  
    if (bookmarkDate >= today) {
      return "today";
    } else if (bookmarkDate >= yesterday) {
      return "yesterday";
    } else {
      return "older";
    }
  }

  showSnackbar() {
    this.snackbarService.openSnackBar('Bookmark successfully added', 2000, 'Dismiss');
  }

}