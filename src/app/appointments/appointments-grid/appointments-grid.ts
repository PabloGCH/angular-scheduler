import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekAppointments, Appointment } from '../appointment';
import { AppointmentItemComponent } from '../appointment-item/appointment-item';

@Component({
  selector: 'app-appointments-grid',
  imports: [CommonModule, AppointmentItemComponent],
  templateUrl: './appointments-grid.html',
  styleUrl: './appointments-grid.scss',
  standalone: true,
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
    { key: 'sunday', label: 'Sun' },
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
    const durationMinutes = endH * 60 + endM - (startH * 60 + startM);
    return (durationMinutes / 30) * 48;
  }
}
