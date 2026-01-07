// App.js in project root
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

// We will create these next
import { ThemeProvider, useTheme } from "../../context/ThemeContext";
import HomeScreen from "./pages/home";
// import TimePickerModal from './src/screens/TimePickerModal'; // Implement later
export type RootStackParamList = {
  Home: undefined;
  SetAlarmModal: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// A wrapper to handle the status bar color based on theme
function AppNavigator() {
  const { theme } = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Now this will stop erroring because Stack knows what 'Home' is */}
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    // Wrap the whole app in our custom ThemeProvider
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
