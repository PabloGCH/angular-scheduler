import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-email',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div>
      <label [for]="id()" class="block text-sm font-medium text-secondary-700">
        {{ label() }}
      </label>
      <div class="mt-1">
        <input
          [id]="id()"
          type="email"
          [autocomplete]="autocomplete()"
          [formControl]="control()"
          class="appearance-none block w-full px-3 py-2 border border-secondary-300 rounded-md shadow-sm placeholder-secondary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
      </div>
      @if (control().invalid && (control().dirty || control().touched)) {
        <div class="mt-1 text-xs text-red-500">
          Please enter a valid email address.
        </div>
      }
    </div>
  `,
  standalone: true
})
export class InputEmailComponent {
  label = input<string>('Email address');
  id = input<string>('email');
  autocomplete = input<string>('email');
  control = input.required<FormControl>();
}
