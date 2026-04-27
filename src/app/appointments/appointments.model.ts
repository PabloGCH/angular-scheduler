export interface Appointment {
  id: string;
  title: string;
  startTime: string; // HH:mm format
  endTime: string;   // HH:mm format
  date: string;      // YYYY-MM-DD
}

export interface WeekAppointments {
  monday: Appointment[];
  tuesday: Appointment[];
  wednesday: Appointment[];
  thursday: Appointment[];
  friday: Appointment[];
  saturday: Appointment[];
  sunday: Appointment[];
}
