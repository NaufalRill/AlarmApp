import { Stack } from 'expo-router';
// Alias the navigation one to 'NavProvider'
import { ThemeProvider as NavProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { ThemeProvider, useTheme } from '../../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { AlarmProvider } from '../../context/AlarmContext';

// Import your global CSS file for NativeWind v4
import "../../global.css";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AlarmProvider>
        <LayoutContent />
      </AlarmProvider>
    </ThemeProvider>
  );
}

function LayoutContent() {
  const { theme } = useTheme();

  return (
    <NavProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </NavProvider>
  );
}