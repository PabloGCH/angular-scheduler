import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Appointment, WeekAppointments } from './appointment';
import { HARDCODED_APPOINTMENTS } from './hardcoded-data';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsManager {
  
  getProviderAppointments(date: Date): Observable<WeekAppointments> {
    // Calculate the start of the week (Monday) for the given date
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(date.setDate(diff));
    monday.setHours(0, 0, 0, 0);

    const weekDates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d.toISOString().split('T')[0];
    });

    const appointments = HARDCODED_APPOINTMENTS.filter(app => weekDates.includes(app.date));

    const result: WeekAppointments = {
      monday: appointments.filter(a => a.date === weekDates[0]),
      tuesday: appointments.filter(a => a.date === weekDates[1]),
      wednesday: appointments.filter(a => a.date === weekDates[2]),
      thursday: appointments.filter(a => a.date === weekDates[3]),
      friday: appointments.filter(a => a.date === weekDates[4]),
      saturday: appointments.filter(a => a.date === weekDates[5]),
      sunday: appointments.filter(a => a.date === weekDates[6]),
    };

    return of(result).pipe(delay(500));
  }
}
