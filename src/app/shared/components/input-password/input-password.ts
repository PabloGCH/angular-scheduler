import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-password',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div>
      <label [for]="id()" class="block text-sm font-medium text-secondary-700">
        {{ label() }}
      </label>
      <div class="mt-1">
        <input
          [id]="id()"
          type="password"
          [autocomplete]="autocomplete()"
          [formControl]="control()"
          class="appearance-none block w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm placeholder-secondary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
      </div>
      @if (control().invalid && (control().dirty || control().touched)) {
        <div class="mt-1 text-xs text-red-500">
          Password must be at least 6 characters long.
        </div>
      }
      @if (errorMessage()) {
        <div class="mt-1 text-xs text-red-500">
          {{ errorMessage() }}
        </div>
      }
    </div>
  `,
  standalone: true
})
export class InputPasswordComponent {
  label = input<string>('Password');
  id = input<string>('password');
  autocomplete = input<string>('current-password');
  control = input.required<FormControl>();
  errorMessage = input<string | null>(null);
}
