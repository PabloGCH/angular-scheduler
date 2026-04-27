import { Appointment } from './appointment';

// April 27, 2026 is a Monday
export const HARDCODED_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    title: 'Morning Meeting',
    description: 'General sync with the team',
    startTime: '09:00',
    endTime: '10:00',
    date: '2026-04-27'
  },
  {
    id: '2',
    title: 'Lunch with Client',
    description: 'Discuss new project requirements',
    startTime: '13:00',
    endTime: '14:30',
    date: '2026-04-27'
  },
  {
    id: '3',
    title: 'Dental Checkup',
    description: 'Routine cleaning',
    startTime: '10:30',
    endTime: '11:30',
    date: '2026-04-28'
  },
  {
    id: '4',
    title: 'Project Review',
    description: 'Deep dive into the latest sprint',
    startTime: '15:00',
    endTime: '16:00',
    date: '2026-04-29'
  },
  {
    id: '5',
    title: 'Gym Session',
    description: 'Leg day with personal trainer',
    startTime: '08:00',
    endTime: '09:30',
    date: '2026-04-30'
  },
  {
    id: '6',
    title: 'Weekly Sync',
    description: 'Wrap up the week goals',
    startTime: '11:00',
    endTime: '12:00',
    date: '2026-05-01'
  }
];
