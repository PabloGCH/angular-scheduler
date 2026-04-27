import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AppointmentsManager } from '../appointments-manager';
import { TopbarComponent } from '../../shared/components/topbar/topbar';
import { ButtonComponent } from '../../shared/components/button/button';

@Component({
  selector: 'app-new-appointment',
  imports: [CommonModule, ReactiveFormsModule, TopbarComponent, ButtonComponent],
  template: `
    <div class="h-screen flex flex-col bg-secondary-50">
      <app-topbar></app-topbar>
      
      <main class="flex-1 p-4 sm:p-6 flex justify-center items-start overflow-auto">
        <div class="bg-white rounded-xl shadow-lg border border-secondary-200 w-full max-w-xl overflow-hidden">
          <div class="bg-primary-600 px-6 py-4 flex justify-between items-center">
            <h1 class="text-xl font-bold text-white">New Appointment</h1>
            <button (click)="goBack()" class="text-primary-100 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form [formGroup]="appointmentForm" (ngSubmit)="onSubmit()" class="p-6 space-y-4">
            <!-- Date Select -->
            <div>
              <label class="block text-sm font-semibold text-secondary-700 mb-1">Date</label>
              <select 
                formControlName="date"
                class="w-full bg-secondary-50 border border-secondary-300 rounded-lg px-4 py-2 text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
              >
                <option value="" disabled>Select a date</option>
                @for (date of availableDates(); track date) {
                  <option [value]="date">{{ date | date:'fullDate' }}</option>
                }
              </select>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <!-- From Select -->
              <div>
                <label class="block text-sm font-semibold text-secondary-700 mb-1">From</label>
                <select 
                  formControlName="from"
                  class="w-full bg-secondary-50 border border-secondary-300 rounded-lg px-4 py-2 text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                >
                  <option value="" disabled>Start time</option>
                  @for (slot of availableTimeSlots(); track slot) {
                    <option [value]="slot">{{ slot }}</option>
                  }
                </select>
              </div>

              <!-- To Select -->
              <div>
                <label class="block text-sm font-semibold text-secondary-700 mb-1">To</label>
                <select 
                  formControlName="to"
                  class="w-full bg-secondary-50 border border-secondary-300 rounded-lg px-4 py-2 text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none disabled:opacity-50"
                >
                  <option value="" disabled>End time</option>
                  @for (slot of availableTimeSlots(); track slot) {
                    <option [value]="slot">{{ slot }}</option>
                  }
                </select>
              </div>
            </div>

            <!-- Title -->
            <div>
              <label class="block text-sm font-semibold text-secondary-700 mb-1">Title</label>
              <input 
                type="text" 
                formControlName="title"
                placeholder="Appointment Title"
                class="w-full bg-secondary-50 border border-secondary-300 rounded-lg px-4 py-2 text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
              >
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-semibold text-secondary-700 mb-1">Description</label>
              <textarea 
                formControlName="description"
                rows="4"
                placeholder="Describe the appointment..."
                class="w-full bg-secondary-50 border border-secondary-300 rounded-lg px-4 py-2 text-secondary-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none resize-none"
              ></textarea>
            </div>

            <div class="pt-4 flex justify-end gap-3">
              <button 
                type="button"
                (click)="goBack()"
                class="px-6 py-2 bg-white border border-secondary-300 text-secondary-700 rounded-lg font-semibold hover:bg-secondary-50 transition-colors"
              >
                Cancel
              </button>
              <app-button 
                [loading]="submitting()"
                [disabled]="appointmentForm.invalid"
              >
                Create Appointment
              </app-button>
            </div>
          </form>
        </div>
      </main>
    </div>
  `,
  standalone: true
})
export class NewAppointmentComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly appointmentsService = inject(AppointmentsManager);

  protected readonly availableDates = signal<string[]>([]);
  protected readonly availableTimeSlots = signal<string[]>([]);
  protected readonly submitting = signal(false);

  protected readonly appointmentForm = this.fb.group({
    date: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    from: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    to: new FormControl({ value: '', disabled: true }, { validators: [Validators.required], nonNullable: true }),
    title: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    description: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  ngOnInit() {
    this.appointmentsService.getAvailableDates().subscribe(dates => this.availableDates.set(dates));
    
    this.appointmentForm.get('date')?.valueChanges.subscribe(date => {
      if (date) {
        this.appointmentsService.getAvailableTimeSlots(date).subscribe(slots => {
          this.availableTimeSlots.set(slots);
        });
      }
    });

    this.appointmentForm.get('from')?.valueChanges.subscribe(from => {
      const toControl = this.appointmentForm.get('to');
      if (from) {
        toControl?.enable();
      } else {
        toControl?.disable();
      }
    });
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      this.submitting.set(true);
      // Simulate save
      setTimeout(() => {
        this.submitting.set(false);
        this.router.navigate(['/home']);
      }, 1000);
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
