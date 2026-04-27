import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmallSpinnerComponent } from '../small-spinner/small-spinner';

@Component({
  selector: 'app-button',
  imports: [CommonModule, SmallSpinnerComponent],
  template: `
    <button
      [type]="type()"
      [disabled]="disabled() || loading()"
      (click)="onClick.emit($event)"
      class="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-secondary-400 disabled:cursor-not-allowed min-h-[38px] cursor-pointer"
    >
      @if (loading()) {
        <app-small-spinner class="mr-2"></app-small-spinner>
      }
      <ng-content></ng-content>
    </button>
  `,
  standalone: true
})
export class ButtonComponent {
  type = input<'submit' | 'button' | 'reset'>('button');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  onClick = output<MouseEvent>();
}
