import { Component, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WeekAppointments, Appointment } from '../appointment';
import { AppointmentItemComponent } from '../appointment-item/appointment-item';
import { SpinnerComponent } from '../../shared/components/spinner/spinner';

@Component({
  selector: 'app-appointments-grid',
  imports: [CommonModule, AppointmentItemComponent, SpinnerComponent],
  templateUrl: './appointments-grid.html',
  styleUrl: './appointments-grid.scss',
  standalone: true,
})
export class AppointmentsGridComponent {
  private readonly router = inject(Router);

  appointments = input.required<WeekAppointments>();
  loading = input<boolean>(false);
  currentWeekStart = input.required<Date>();

  protected readonly slotHeight = 48; // px

  protected readonly days = [
    { key: 'monday', label: 'Mon', index: 0 },
    { key: 'tuesday', label: 'Tue', index: 1 },
    { key: 'wednesday', label: 'Wed', index: 2 },
    { key: 'thursday', label: 'Thu', index: 3 },
    { key: 'friday', label: 'Fri', index: 4 },
    { key: 'saturday', label: 'Sat', index: 5 },
    { key: 'sunday', label: 'Sun', index: 6 },
  ];

  protected getDateForDay(index: number): Date {
    const date = new Date(this.currentWeekStart());
    date.setDate(date.getDate() + index);
    return date;
  }

  protected readonly timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const min = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${min}`;
  });

  protected isHighlighted(dayKey: string): boolean {
    const today = new Date();
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    
    // Check if it's today
    if (dayNames[today.getDay()] !== dayKey) return false;

    // Check if the current grid week is the real current week
    const displayedWeekStart = new Date(this.currentWeekStart());
    displayedWeekStart.setHours(0, 0, 0, 0);

    const realToday = new Date();
    const day = realToday.getDay();
    const diff = realToday.getDate() - day + (day === 0 ? -6 : 1);
    const realMonday = new Date(realToday.setDate(diff));
    realMonday.setHours(0, 0, 0, 0);

    return displayedWeekStart.getTime() === realMonday.getTime();
  }

  protected isDisabled(dayKey: string): boolean {
    return this.appointments().disabledDays?.includes(dayKey) ?? false;
  }

  protected getAppointmentsForDay(dayKey: string): Appointment[] {
    return (this.appointments() as any)[dayKey] || [];
  }

  protected getTop(startTime: string): number {
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    return (totalMinutes / 30) * this.slotHeight;
  }

  protected getHeight(startTime: string, endTime: string): number {
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    const durationMinutes = endH * 60 + endM - (startH * 60 + startM);
    return (durationMinutes / 30) * this.slotHeight;
  }

  protected onAppointmentClick(id: string) {
    this.router.navigate(['/appointment', id]);
  }
}
