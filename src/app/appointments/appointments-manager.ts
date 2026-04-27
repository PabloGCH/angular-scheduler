import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Appointment, WeekAppointments } from './appointment';
import { HARDCODED_APPOINTMENTS } from './hardcoded-data';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsManager {
  getAppointmentsForDay(date: Date): Observable<WeekAppointments> {
    // Clone date to avoid mutation
    const workingDate = new Date(date);
    const day = workingDate.getDay();
    // Adjust to Monday
    const diff = workingDate.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(workingDate.setDate(diff));
    monday.setHours(0, 0, 0, 0);

    const formatDate = (d: Date) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const weekDates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return formatDate(d);
    });

    const appointments = HARDCODED_APPOINTMENTS.filter((app) => weekDates.includes(app.date));

    const result: WeekAppointments = {
      monday: appointments.filter((a) => a.date === weekDates[0]),
      tuesday: appointments.filter((a) => a.date === weekDates[1]),
      wednesday: appointments.filter((a) => a.date === weekDates[2]),
      thursday: appointments.filter((a) => a.date === weekDates[3]),
      friday: appointments.filter((a) => a.date === weekDates[4]),
      saturday: appointments.filter((a) => a.date === weekDates[5]),
      sunday: appointments.filter((a) => a.date === weekDates[6]),
      disabledDays: ['saturday', 'sunday'],
    };

    return of(result).pipe(delay(500));
  }

  getAppointmentById(id: string): Observable<Appointment | undefined> {
    return of(HARDCODED_APPOINTMENTS.find((a) => a.id === id)).pipe(delay(300));
  }

  getAvailableDates(): Observable<string[]> {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 5; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d.toISOString().split('T')[0]);
    }
    return of(dates).pipe(delay(300));
  }

  getAvailableTimeSlots(date: string): Observable<string[]> {
    const slots = Array.from({ length: 48 }, (_, i) => {
      const hour = Math.floor(i / 2);
      const min = i % 2 === 0 ? '00' : '30';
      return `${hour.toString().padStart(2, '0')}:${min}`;
    });
    return of(slots).pipe(delay(300));
  }
}
