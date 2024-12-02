import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {}
  
  openSnackBar(message: string, duration: number = 2000, dismissText?: string) {
    this.snackBar.open(message, dismissText, {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
  
}