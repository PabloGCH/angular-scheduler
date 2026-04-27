import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekAppointments, Appointment } from '../../../appointments/appointments.model';

@Component({
  selector: 'app-appointments-grid',
  imports: [CommonModule],
  template: `
    <div class="flex flex-col h-full bg-white rounded-lg shadow-sm border border-secondary-200 overflow-hidden">
      <!-- Main Scroll Container -->
      <div class="flex-1 overflow-auto relative">
        
        <!-- Table Wrapper -->
        <div class="flex flex-col w-max min-w-full">
          
          <!-- Header (Sticky Top) -->
          <div class="flex sticky top-0 z-40 bg-secondary-50 border-b border-secondary-200">
            <!-- Sticky Corner -->
            <div class="w-16 sm:w-20 sticky left-0 z-50 bg-secondary-50 border-r border-secondary-200 p-2 text-xs font-semibold text-secondary-500 text-center flex-shrink-0 flex items-center justify-center">
              Time
            </div>
            <!-- Day Headers -->
            @for (day of days; track day.key) {
              <div 
                class="day-column-width p-2 text-center border-r border-secondary-200 last:border-r-0 flex-shrink-0"
                [class.bg-primary-50]="isToday(day.key)"
              >
                <div class="text-xs font-semibold text-secondary-500 uppercase">{{ day.label }}</div>
              </div>
            }
          </div>

          <!-- Body -->
          <div class="flex">
            <!-- Time Column (Sticky Left) -->
            <div class="w-16 sm:w-20 sticky left-0 z-30 bg-secondary-50 border-r border-secondary-200 flex-shrink-0">
              @for (slot of timeSlots; track slot) {
                <div class="h-12 border-b border-secondary-200 text-secondary-500 flex items-center justify-center" style="font-size: var(--calendar-time-font-size)">
                  {{ slot }}
                </div>
              }
            </div>

            <!-- Day Columns -->
            @for (day of days; track day.key) {
              <div 
                class="day-column-width relative border-r border-secondary-200 last:border-r-0 flex-shrink-0"
                [class.bg-primary-50/30]="isToday(day.key)"
              >
                <!-- Grid Rows -->
                @for (slot of timeSlots; track slot; let i = $index) {
                  <div 
                    class="h-12 border-b border-secondary-100"
                    [class.bg-secondary-50/50]="i % 2 === 0"
                  ></div>
                }

                <!-- Appointments -->
                @for (app of getAppointmentsForDay(day.key); track app.id) {
                  <div 
                    class="absolute left-1 right-1 p-1 rounded text-[10px] leading-tight overflow-hidden shadow-sm bg-primary-100 border border-primary-200 text-primary-700 z-10"
                    [style.top.px]="getTop(app.startTime)"
                    [style.height.px]="getHeight(app.startTime, app.endTime)"
                  >
                    <div class="font-bold">{{ app.startTime }} - {{ app.endTime }}</div>
                    <div>Appointment</div>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .day-column-width {
      /* Mobile < 400px: 1 day visible + time column */
      min-width: calc(100vw - 6rem);
    }
    
    @media (min-width: 400px) {
      .day-column-width {
        /* 2 days visible */
        min-width: calc((100vw - 6rem) / 2);
      }
    }

    @media (min-width: 520px) {
      .day-column-width {
        /* 3 days visible */
        min-width: calc((100vw - 6rem) / 3);
      }
    }

    @media (min-width: 640px) { /* sm */
      .day-column-width {
        /* All 7 days visible */
        min-width: 0;
        flex: 1;
      }
    }

    /* Support for w-max wrapper to allow horizontal scrolling if needed */
    :host {
      display: block;
      height: 100%;
    }
  `],
  standalone: true
})
export class AppointmentsGridComponent {
  appointments = input.required<WeekAppointments>();

  protected readonly days = [
    { key: 'monday', label: 'Mon' },
    { key: 'tuesday', label: 'Tue' },
    { key: 'wednesday', label: 'Wed' },
    { key: 'thursday', label: 'Thu' },
    { key: 'friday', label: 'Fri' },
    { key: 'saturday', label: 'Sat' },
    { key: 'sunday', label: 'Sun' }
  ];

  protected readonly timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const min = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${min}`;
  });

  protected isToday(dayKey: string): boolean {
    const today = new Date();
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return dayNames[today.getDay()] === dayKey;
  }

  protected getAppointmentsForDay(dayKey: string): Appointment[] {
    return (this.appointments() as any)[dayKey] || [];
  }

  protected getTop(startTime: string): number {
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    // Each 30 mins = 48px (h-12)
    return (totalMinutes / 30) * 48;
  }

  protected getHeight(startTime: string, endTime: string): number {
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    const durationMinutes = (endH * 60 + endM) - (startH * 60 + startM);
    return (durationMinutes / 30) * 48;
  }
}
