import {StatusBar} from 'expo-status-bar';
import Navigation from "./components/Navigation";
import {SafeAreaProvider} from "react-native-safe-area-context";
import React, {useEffect, useState} from "react";
import {apiClient} from "./services/api";
import {ActivityIndicator, View} from "react-native";

export default function App() {
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if token exists when app loads
    const checkToken = async () => {
      const tokenExists = await apiClient.hasToken();
      setHasToken(tokenExists);
    };

    checkToken();

    // Register for token change notifications
    const tokenChangeListener = (exists: boolean) => {
      setHasToken(exists);
    };

    apiClient.addTokenChangeListener(tokenChangeListener);

    // Cleanup listener on unmount
    return () => {
      apiClient.removeTokenChangeListener(tokenChangeListener);
    };
  }, []);

  // Show loading indicator while checking for token
  if (hasToken === null) {
    return (
      <SafeAreaProvider>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large"/>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <Navigation initialRouteName={hasToken ? 'HomeTabs' : 'Login'}/>
      <StatusBar style="auto"/>
    </SafeAreaProvider>
  );
}
