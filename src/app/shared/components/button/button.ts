import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      (click)="onClick.emit($event)"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-secondary-400 disabled:cursor-not-allowed"
    >
      <ng-content></ng-content>
    </button>
  `,
  standalone: true
})
export class ButtonComponent {
  type = input<'submit' | 'button' | 'reset'>('button');
  disabled = input<boolean>(false);
  onClick = output<MouseEvent>();
}
