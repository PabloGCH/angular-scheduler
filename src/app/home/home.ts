import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { TopbarComponent } from '../shared/components/topbar/topbar';
import { AppointmentsGridComponent } from '../shared/components/appointments-grid/appointments-grid';
import { ButtonComponent } from '../shared/components/button/button';
import { AuthService } from '../auth/auth.service';
import { AppointmentsService } from '../appointments/appointments.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TopbarComponent, AppointmentsGridComponent],
  template: `
    <div class="h-screen flex flex-col overflow-hidden bg-secondary-50">
      <app-topbar></app-topbar>
      
      <main class="flex-1 flex flex-col p-4 sm:p-6 overflow-hidden">
        @if (userType() === 'provider') {
          <!-- Action Buttons Section -->
          <div class="flex items-center justify-between mb-4 bg-white p-2 rounded-lg border border-secondary-200 shadow-sm">
            <div class="w-1/4">
              <button class="text-secondary-600 hover:text-primary-600 font-medium text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Previous Week
              </button>
            </div>
            
            <div class="w-2/4 flex justify-center gap-4">
              <button class="bg-primary-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors">
                Give appointment
              </button>
              <button class="border border-secondary-300 text-secondary-700 px-4 py-1.5 rounded-md text-sm font-medium hover:bg-secondary-50 transition-colors">
                Configure
              </button>
            </div>

            <div class="w-1/4 flex justify-end">
              <button class="text-secondary-600 hover:text-primary-600 font-medium text-sm flex items-center">
                Next Week
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Appointments Grid -->
          <div class="flex-1 overflow-hidden">
            @if (appointments(); as apps) {
              <app-appointments-grid [appointments]="apps" class="h-full"></app-appointments-grid>
            } @else {
              <div class="flex items-center justify-center h-full">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            }
          </div>
        } @else {
          <div class="max-w-7xl mx-auto w-full">
            <h1 class="text-3xl font-bold text-secondary-900 mb-6">Welcome, Consumer</h1>
            <div class="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
              <p class="text-secondary-600">This is your consumer dashboard. Book your next appointment here.</p>
            </div>
          </div>
        }
      </main>
    </div>
  `,
  standalone: true
})
export class HomeComponent {
  private readonly authService = inject(AuthService);
  private readonly appointmentsService = inject(AppointmentsService);

  protected readonly userType = computed(() => this.authService.getUserType());
  
  protected readonly appointments = toSignal(
    this.appointmentsService.getProviderAppointments(new Date())
  );
}
