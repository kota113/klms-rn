import {StatusBar} from 'expo-status-bar';
import Navigation from "./components/Navigation";
import {SafeAreaProvider} from "react-native-safe-area-context";
import React, {useEffect, useState} from "react";
import {apiClient} from "./services/api";
import {View} from "react-native";
import {Skeleton} from "./components/skeleton";
import * as SecureStore from 'expo-secure-store';
import {ONBOARDING_COMPLETED_KEY} from "./screens/OnboardingScreen";

export default function App() {
  const [hasSession, setHasSession] = useState<boolean | null>(null);
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if a Canvas session marker exists when app loads.
    const checkSession = async () => {
      const [sessionExists, onboardingDone] = await Promise.all([
        apiClient.hasSession(),
        SecureStore.getItemAsync(ONBOARDING_COMPLETED_KEY).then(v => v === 'true'),
      ]);
      setHasSession(sessionExists);
      setOnboardingCompleted(onboardingDone);
    };

    checkSession();

    // Register for session change notifications.
    const sessionChangeListener = (exists: boolean) => {
      setHasSession(exists);
    };

    apiClient.addSessionChangeListener(sessionChangeListener);

    // Cleanup listener on unmount
    return () => {
      apiClient.removeSessionChangeListener(sessionChangeListener);
    };
  }, []);

  // Show loading indicator while checking for session/onboarding state.
  if (hasSession === null || onboardingCompleted === null) {
    return (
      <SafeAreaProvider>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Skeleton width={96} height={96} variant="rounded"/>
        </View>
      </SafeAreaProvider>
    );
  }

  const initialRouteName = hasSession ? 'HomeTabs' : onboardingCompleted ? 'Login' : 'Onboarding';

  return (
    <SafeAreaProvider>
      <Navigation initialRouteName={initialRouteName}/>
      <StatusBar style="auto"/>
    </SafeAreaProvider>
  );
}
