import React, {useMemo, useRef, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Button, Text, YStack} from "../../components/ui";
import NativeLoadingIndicator from "../../components/NativeLoadingIndicator";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WebView, WebViewMessageEvent, WebViewNavigation} from 'react-native-webview';
import {apiClient} from '../../services/api';
import {RootStackParamList} from '../../components/Navigation';
import * as SecureStore from 'expo-secure-store';
import {ONBOARDING_COMPLETED_KEY} from '../OnboardingScreen';
import {
  buildCanvasSessionDetectorScript,
  CANVAS_BASE_URL,
  parseCanvasSessionMessage,
} from '../../services/auth/canvasSession';

const CanvasLoginScreen = ({navigation}: NativeStackScreenProps<RootStackParamList>) => {
  const webViewRef = useRef<WebView>(null);
  const sessionCheckInFlightRef = useRef(false);
  const [isCheckingSession, setIsCheckingSession] = useState(false);
  const [isSavingSession, setIsSavingSession] = useState(false);
  const sessionDetectorScript = useMemo(() => buildCanvasSessionDetectorScript(), []);

  const handleSessionReady = async () => {
    if (isSavingSession) {
      return;
    }

    setIsSavingSession(true);

    try {
      const cookiesCaptured = await apiClient.captureSessionFromCookieJar();
      if (!cookiesCaptured) {
        throw new Error('Canvas session cookies were not available in the native cookie store.');
      }

      const sessionIsUsable = await apiClient.verifySession();
      if (!sessionIsUsable) {
        throw new Error('Canvas API did not accept the stored cookies.');
      }

      await apiClient.setSessionAuthenticated();
      await SecureStore.setItemAsync(ONBOARDING_COMPLETED_KEY, 'true');
      navigation.replace('HomeTabs');
    } catch (error) {
      console.error('Error verifying Canvas session:', error);
      Alert.alert('エラー', 'ログインに失敗しました。もう一度お試しください。');
      setIsSavingSession(false);
    }
  };

  const handleMessage = (event: WebViewMessageEvent) => {
    const message = parseCanvasSessionMessage(event.nativeEvent.data);
    if (!message) {
      return;
    }

    if (message.type === 'not-authenticated') {
      sessionCheckInFlightRef.current = false;
      setIsCheckingSession(false);
      return;
    }

    sessionCheckInFlightRef.current = false;
    setIsCheckingSession(false);
    handleSessionReady().then();
  };

  const handleNavigationStateChange = (_navState: WebViewNavigation) => {
    // no-op: state tracking removed to avoid exposing internal info to users
  };

  const handleLoadEnd = ({nativeEvent}: { nativeEvent: { url: string } }) => {
    if (
      isSavingSession ||
      sessionCheckInFlightRef.current ||
      !nativeEvent.url.startsWith(CANVAS_BASE_URL)
    ) {
      return;
    }

    sessionCheckInFlightRef.current = true;
    setIsCheckingSession(true);
    webViewRef.current?.injectJavaScript(sessionDetectorScript);
  };

  const reloadLogin = () => {
    webViewRef.current?.reload();
  };

  return (
    <View style={styles.container}>
      <YStack gap={8} paddingHorizontal={20} paddingTop={12} paddingBottom={16} backgroundColor="white" borderBottomWidth={1} borderColor="$borderColor">
        <Text fontSize={22} fontWeight="800" color="#333">
          ログイン
        </Text>
        <Text fontSize={14} color="#666">
          {"K-LMSにログインしてください。\nログインが完了すると自動的にアプリに移動します。"}
        </Text>
      </YStack>

      <View style={styles.webViewContainer}>
        <WebView
          ref={webViewRef}
          source={{uri: CANVAS_BASE_URL}}
          javaScriptEnabled
          domStorageEnabled
          sharedCookiesEnabled
          thirdPartyCookiesEnabled
          onMessage={handleMessage}
          onNavigationStateChange={handleNavigationStateChange}
          onLoadEnd={handleLoadEnd}
          startInLoadingState
          renderLoading={() => (
            <View style={styles.loadingOverlay}>
              <YStack alignItems="center" gap="$3">
                <NativeLoadingIndicator/>
              </YStack>
            </View>
          )}
        />

        {(isCheckingSession || isSavingSession) && (
          <View style={styles.statusOverlay} pointerEvents="none">
            <YStack alignItems="center" gap="$3">
              <NativeLoadingIndicator/>
            </YStack>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webViewContainer: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  statusOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.86)',
    justifyContent: 'center',
  },
});

export default CanvasLoginScreen;
