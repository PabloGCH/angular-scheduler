import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-choose-appointment',
  imports: [CommonModule],
  template: `
    <div class="h-screen flex items-center justify-center bg-secondary-50 p-4">
      <div class="bg-white p-12 rounded-2xl shadow-xl border border-secondary-200 text-center">
        <h1 class="text-4xl font-black text-primary-600 mb-4 tracking-tight">Choose!</h1>
        <p class="text-secondary-500">Select your preferred appointment slot.</p>
      </div>
    </div>
  `,
  standalone: true
})
export class ChooseAppointmentComponent {}
