import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../context/ThemeContext";
import { RootStackParamList } from "../App";
import { Link } from 'expo-router';
import { useAlarms } from '../../../context/AlarmContext';
import { Alarm } from '../../../types/alarm';

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ navigation }: Props) => {
  const { theme, toggleTheme } = useTheme();
  const { alarms, deleteAlarm } = useAlarms();

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#121212]">
      <View className="p-6 flex-1 items-center justify-center">


        <TouchableOpacity
          onPress={toggleTheme}
          className="absolute top-10 right-6 p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
        >
          <Ionicons
            name={theme === "dark" ? "sunny" : "moon"}
            size={24}
            color={theme === "dark" ? "white" : "black"}
          />
        </TouchableOpacity>

      
        <Text className="text-5xl font-extrabold text-center text-black dark:text-white">
          WakeThe
        </Text>
        <Text className="text-6xl font-extrabold text-center mb-10 text-black dark:text-white">
          F-Up
        </Text>

        <Link href="/modal" asChild>
          <TouchableOpacity className="flex-row items-center bg-[#5B4DFF] mt-10 py-4 px-10 rounded-2xl shadow-lg">
              <Ionicons name="alarm-outline" size={24} color="white" />
              <Text className="text-white text-xl font-bold ml-2">Set Alarm</Text>
          </TouchableOpacity>
        </Link>

        {/* Alarm List Card */}
        <ScrollView className="mt-10 w-full h-auto bg-[#F3F0F7] dark:bg-[#1A1A1A] rounded-[40px] p-6 shadow-sm">
           {alarms.map((alarm) => (
             <AlarmItem 
               key={alarm.id} 
               alarm={alarm} 
               onDelete={() => deleteAlarm(alarm.id)}
               formatTime={formatTime}
             />
           ))}
        </ScrollView>

        
      </View>
    </SafeAreaView>
  );
};

// Component for a single alarm row
const AlarmItem = ({ alarm, onDelete, formatTime }: { alarm: Alarm, onDelete: () => void, formatTime: (d:Date)=>string }) => {
  return (
    <View className="flex-row items-center justify-between py-4 border-b border-gray-200 dark:border-gray-800 last:border-0">
      <View className="flex-row items-center">
        <Ionicons name="alarm" size={24} color="black" className="text-black dark:text-white" />
        <Text className="text-2xl font-bold ml-4 text-black dark:text-white">
            {formatTime(alarm.time)}
        </Text>
      </View>
      <View className="flex-row space-x-4">
        <TouchableOpacity><Ionicons name="pencil" size={20} color="#5B4DFF" /></TouchableOpacity>
        <TouchableOpacity onPress={onDelete}><Ionicons name="trash" size={20} color="#FF4D4D" /></TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeScreen;
