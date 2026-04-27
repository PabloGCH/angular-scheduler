import { Component } from '@angular/core';

@Component({
  selector: 'app-small-spinner',
  template: `
    <div
      class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent text-white rounded-full"
      role="status"
      aria-label="loading"
    >
      <span class="sr-only">Loading...</span>
    </div>
  `,
  standalone: true
})
export class SmallSpinnerComponent {}
