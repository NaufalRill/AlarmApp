// app/modal.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAlarms } from '../context/AlarmContext';

export default function ModalScreen() {
  const router = useRouter();
  const { addAlarm } = useAlarms();
  const [date, setDate] = useState(new Date());

  const [waktu_mulai, setWaktuMulai] = useState('');
  const [waktuMulaiDate, setWaktuMulaiDate] = useState<Date>(new Date());
  const [showTimeMulaiPicker, setShowTimeMulaiPicker] = useState(false);



  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const handleSetAlarm = () => {
    addAlarm(date);
    router.back(); // Close modal
  };

  return (
    <View className="flex-1 items-center justify-center bg-[#5B4DFF]">
      <Text className="text-white text-3xl font-bold mb-8">WakeThe</Text>
      
      <View className="bg-white rounded-3xl p-2 w-11/12 items-center">
          <Text className="text-[#5B4DFF] font-bold mb-4 self-start ml-4 mt-2">Select time</Text>
          {/* The picker itself */}
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="time"
            is24Hour={true}
            display="spinner" // Gives the wheel look on iOS, clock on Android
            onChange={onChange}
            textColor="#5B4DFF" // iOS specific
            style={{ height: 200, width: '100%' }}
          />
          
          <View className="flex-row justify-end w-full mt-4 space-x-6 mr-4 mb-2">
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-[#5B4DFF] font-bold text-lg">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSetAlarm}>
              <Text className="text-[#5B4DFF] font-bold text-lg">OK</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  );
}