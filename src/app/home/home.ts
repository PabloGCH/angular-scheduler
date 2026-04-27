import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap, tap, finalize, BehaviorSubject } from 'rxjs';
import { TopbarComponent } from '../shared/components/topbar/topbar';
import { AppointmentsGridComponent } from '../appointments/appointments-grid/appointments-grid';
import { Authenticator } from '../auth/authenticator';
import { AppointmentsManager } from '../appointments/appointments-manager';
import { WeekAppointments } from '../appointments/appointment';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TopbarComponent, AppointmentsGridComponent],
  templateUrl: './home.html',
  standalone: true,
})
export class HomeComponent {
  private readonly authService = inject(Authenticator);
  private readonly appointmentsService = inject(AppointmentsManager);

  protected readonly userType = computed(() => this.authService.getUserType());
  protected readonly menuOpen = signal(false);
  protected readonly loading = signal(false);

  protected readonly currentDate = signal(new Date('2026-04-27'));

  protected readonly emptyWeek: WeekAppointments = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  };

  private readonly refreshTrigger$ = new BehaviorSubject<Date>(this.currentDate());

  protected readonly appointments = toSignal(
    this.refreshTrigger$.pipe(
      tap(() => this.loading.set(true)),
      switchMap((date) =>
        this.appointmentsService
          .getAppointmentsForDay(date)
          .pipe(finalize(() => this.loading.set(false))),
      ),
    ),
    { initialValue: this.emptyWeek },
  );

  protected readonly currentWeekStart = computed(() => {
    const date = new Date(this.currentDate());
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(date.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday;
  });

  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }

  nextWeek() {
    const next = new Date(this.currentWeekStart());
    next.setDate(next.getDate() + 7);
    this.currentDate.set(next);
    this.refreshTrigger$.next(next);
    this.menuOpen.set(false);
  }

  previousWeek() {
    const prev = new Date(this.currentWeekStart());
    prev.setDate(prev.getDate() - 7);
    this.currentDate.set(prev);
    this.refreshTrigger$.next(prev);
    this.menuOpen.set(false);
  }
}
