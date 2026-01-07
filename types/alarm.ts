// src/types/alarm.ts
export interface Alarm {
  id: string;
  time: Date; // Using Date object makes it easier to work with the picker
  isEnabled: boolean;
}