import {StatusBar} from 'expo-status-bar';
import Navigation from "./components/Navigation";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {createTamagui, TamaguiProvider} from "tamagui";
import {config} from "./tamagui.config";
import React, {useEffect, useState} from "react";
import {apiClient} from "./services/api";
import TokenInputScreen from "./screens/TokenInputScreen";
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
        <TamaguiProvider config={createTamagui(config)}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large"/>
          </View>
        </TamaguiProvider>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <TamaguiProvider config={createTamagui(config)}>
        {hasToken ? (
          <>
            <Navigation/>
            <StatusBar style="auto"/>
          </>
        ) : (
          <TokenInputScreen onTokenSaved={() => setHasToken(true)}/>
        )}
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
