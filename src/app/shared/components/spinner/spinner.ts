import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center w-full h-full">
      <div
        class="animate-spin rounded-full border-4 border-secondary-200 border-t-primary-600"
        [ngClass]="sizeClasses[size()]"
        role="status"
        aria-label="loading"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  `,
  standalone: true
})
export class SpinnerComponent {
  size = input<'sm' | 'md' | 'lg'>('md');

  protected readonly sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-4',
    lg: 'w-16 h-16 border-8'
  };
}
