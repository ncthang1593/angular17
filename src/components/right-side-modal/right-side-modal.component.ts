import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-right-side-modal',
  standalone: true,
  imports: [CommonModule],
  template: ` <div class="right-side-modal">
    <ng-container>
      <ng-container *ngIf="isCanCloseOutside; else cannotCloseOutside">
        <div
          class="modal-overlay"
          *ngIf="isVisible"
          (click)="closeModal()"
        ></div>
      </ng-container>
      <ng-template #cannotCloseOutside>
        <div class="modal-overlay no-click" *ngIf="isVisible"></div>
      </ng-template>
    </ng-container>
    <div class="modal" [ngClass]="{ visible: isVisible }">
      <div class="modal-header">
        <h2>{{ modalTitle }}</h2>
        <button class="close-button" (click)="closeModal()">X</button>
      </div>
      <div class="modal-body">
        <ng-content></ng-content>
      </div>
    </div>
  </div>`,
  styleUrls: ['./right-side-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightSideModalComponent {
  @Input() isModalOpen = false;
  @Input() isCanCloseOutside = true;
  @Input() modalTitle = 'Modal Title';
  @Output() close = new EventEmitter<void>();
  isVisible = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isModalOpen']) {
      this.isVisible = this.isModalOpen;
    }

    console.log('commit 1');
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(_event: KeyboardEvent) {
    this.closeModal();
  }

  closeModal() {
    this.isVisible = false;
    setTimeout(() => this.close.emit(), 300);
  }
}
