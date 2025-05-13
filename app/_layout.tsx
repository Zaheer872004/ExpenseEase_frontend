import { Slot, Stack, useRouter, useSegments } from "expo-router";
import "./globals.css";

import {
  AuthContext,
  AuthContextProvider,
  useAuth,
} from "@/context/authContext";
import { SmsProvider } from "@/context/smsContext";
import { useEffect, useState } from "react";

// Updated timestamp information
const LAST_UPDATED = "2025-05-13 10:33:08"; 
const CURRENT_USER = "Zaheer87";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [lastAuthState, setLastAuthState] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // Prevent unnecessary navigation during initial load 
    if (typeof isAuthenticated === "undefined") {
      return;
    }
    
    console.log(`[${LAST_UPDATED}] Current route: ${segments.join('/')}`);
    
    const inTabs = segments[0] === "(tabs)";
    
    // Special case for auth screens
    const currentScreen = segments[0];
    const inAuthProcess = currentScreen === "signIn" || currentScreen === "signUp";
    
    if (isAuthenticated === true) {
      // User is authenticated
      if (!inTabs) {
        console.log(`[${LAST_UPDATED}] Redirecting to home: User is authenticated`);
        router.replace("/(tabs)/home");
      }
    } else if (isAuthenticated === false) {
      // User is not authenticated
      if (!inAuthProcess) {
        console.log(`[${LAST_UPDATED}] Redirecting to sign in: User is not authenticated`);
        // Use navigation that doesn't get intercepted by the history stack
        router.replace("/signIn");
      } else {
        console.log(`[${LAST_UPDATED}] Already in auth process (${currentScreen}), no redirect needed`);
      }
    }
  }, [isAuthenticated, segments]);

  // Note: We only define screens that Expo Router recognizes from your logs
  return (
    <Stack screenOptions={{ animation: 'none' }}>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="category/[category]"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="setting"
        options={{
          headerTitle: "Settings",
        }}
      />
      
      <Stack.Screen
        name="signIn"
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="signUp"
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <SmsProvider>
        <MainLayout />
      </SmsProvider>
    </AuthContextProvider>
  );
}