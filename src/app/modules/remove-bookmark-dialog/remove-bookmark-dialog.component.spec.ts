import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveBookmarkDialogComponent } from './remove-bookmark-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('RemoveBookmarkDialogComponent', () => {
  let component: RemoveBookmarkDialogComponent;
  let fixture: ComponentFixture<RemoveBookmarkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemoveBookmarkDialogComponent],
      imports: [
        HttpClientModule,
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoveBookmarkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
