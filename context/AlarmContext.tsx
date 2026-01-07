// src/context/AlarmContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Alarm } from '../types/alarm';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

interface AlarmContextType {
  alarms: Alarm[];
  addAlarm: (time: Date) => void;
  deleteAlarm: (id: string) => void;
}

const AlarmContext = createContext<AlarmContextType | undefined>(undefined);

export const AlarmProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with dummy data to match your image
  const [alarms, setAlarms] = useState<Alarm[]>([
    { id: uuidv4(), time: new Date().setHours(9, 30, 0, 0) as any, isEnabled: true },
    { id: uuidv4(), time: new Date().setHours(10, 30, 0, 0) as any, isEnabled: true },
    { id: uuidv4(), time: new Date().setHours(11, 0, 0, 0) as any, isEnabled: true },
  ]);

  const addAlarm = (time: Date) => {
    const newAlarm: Alarm = {
      id: uuidv4(),
      time,
      isEnabled: true,
    };
    setAlarms([...alarms, newAlarm]);
  };

  const deleteAlarm = (id: string) => {
    setAlarms(alarms.filter((alarm) => alarm.id !== id));
  };

  return (
    <AlarmContext.Provider value={{ alarms, addAlarm, deleteAlarm }}>
      {children}
    </AlarmContext.Provider>
  );
};

export const useAlarms = () => {
  const context = useContext(AlarmContext);
  if (!context) throw new Error('useAlarms must be used within an AlarmProvider');
  return context;
};