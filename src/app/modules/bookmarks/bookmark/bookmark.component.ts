import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.scss'
})
export class BookmarkComponent {
  @Input() title!: string;
  @Input() url!: string;
  @Input() category!: string;
  @Input() bookmark: any;

  // Event emitter to notify the parent
  @Output() editClicked = new EventEmitter<any>();
  @Output() removeClicked = new EventEmitter<any>();

  onEditClick(): void {
    this.editClicked.emit(this.bookmark);
  }

  onRemoveClick(): void {
    this.removeClicked.emit(this.bookmark);
  }

}

