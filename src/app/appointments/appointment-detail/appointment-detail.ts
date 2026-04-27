import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentsManager } from '../appointments-manager';
import { Appointment } from '../appointment';
import { TopbarComponent } from '../../shared/components/topbar/topbar';

@Component({
  selector: 'app-appointment-detail',
  imports: [CommonModule, TopbarComponent],
  template: `
    <div class="h-screen flex flex-col bg-secondary-50">
      <app-topbar></app-topbar>
      
      <main class="flex-1 p-4 sm:p-6 flex justify-center items-start overflow-auto">
        <div class="bg-secondary-100 rounded-xl shadow-lg border border-secondary-200 w-full max-w-2xl overflow-hidden">
          @if (loading()) {
            <div class="p-12 flex justify-center">
              <div class="animate-spin rounded-full h-12 w-12 border-4 border-secondary-200 border-t-primary-600"></div>
            </div>
          } @else if (appointment()) {
            @let app = appointment()!;
            <div class="bg-primary-600 px-6 py-4 flex justify-between items-center">
              <h1 class="text-xl font-bold text-white">Appointment Details</h1>
              <button (click)="goBack()" class="text-primary-100 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div class="p-6 space-y-6">
              <div class="flex items-start gap-4">
                <div class="bg-primary-100 p-3 rounded-lg text-primary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <label class="text-xs font-bold text-secondary-500 uppercase tracking-wider">Date & Time</label>
                  <p class="text-lg font-semibold text-secondary-900">{{ app.date | date:'fullDate' }}</p>
                  <p class="text-secondary-600">{{ app.startTime }} - {{ app.endTime }}</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="bg-primary-100 p-3 rounded-lg text-primary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <div>
                  <label class="text-xs font-bold text-secondary-500 uppercase tracking-wider">Title</label>
                  <p class="text-lg font-semibold text-secondary-900">{{ app.title }}</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="bg-primary-100 p-3 rounded-lg text-primary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
                <div>
                  <label class="text-xs font-bold text-secondary-500 uppercase tracking-wider">Description</label>
                  <p class="text-secondary-700 whitespace-pre-wrap">{{ app.description }}</p>
                </div>
              </div>
            </div>
            
            <div class="bg-secondary-100 px-6 py-4 border-t border-secondary-200 flex justify-end">
              <button 
                (click)="goBack()"
                class="px-6 py-2 bg-secondary-200 border border-secondary-300 text-secondary-900 rounded-lg font-semibold hover:bg-secondary-300 transition-colors"
              >
                Back to Grid
              </button>
            </div>
          } @else {
            <div class="p-12 text-center">
              <p class="text-secondary-600">Appointment not found.</p>
              <button (click)="goBack()" class="mt-4 text-primary-600 font-semibold hover:underline">Go back</button>
            </div>
          }
        </div>
      </main>
    </div>
  `,
  standalone: true
})
export class AppointmentDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly appointmentsService = inject(AppointmentsManager);

  protected readonly appointment = signal<Appointment | undefined>(undefined);
  protected readonly loading = signal(true);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.appointmentsService.getAppointmentById(id).subscribe({
        next: (app) => {
          this.appointment.set(app);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
    } else {
      this.loading.set(false);
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
