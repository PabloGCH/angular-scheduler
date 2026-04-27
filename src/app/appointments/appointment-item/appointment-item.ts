import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Appointment } from '../appointment';

@Component({
  selector: 'app-appointment-item',
  imports: [CommonModule],
  template: `
    <div
      class="absolute left-1 right-1 p-1.5 rounded overflow-hidden shadow-sm bg-primary-100 border border-primary-200 z-10 cursor-pointer hover:bg-primary-200 transition-colors"
      [style.top.px]="top()"
      [style.height.px]="height()"
    >
      <div class="font-bold text-xs">{{ appointment().startTime }} - {{ appointment().endTime }}</div>
      <div class="text-xs font-semibold truncate">{{ appointment().title }}</div>
      <div class="text-[10px] truncate opacity-80">{{ appointment().description }}</div>
    </div>
  `,
  standalone: true
})
export class AppointmentItemComponent {
  appointment = input.required<Appointment>();
  top = input.required<number>();
  height = input.required<number>();
}
