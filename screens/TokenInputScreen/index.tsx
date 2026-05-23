import React, {useMemo, useRef, useState} from 'react';
import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
import {Button, Text, YStack} from "../../components/ui";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WebView, WebViewMessageEvent, WebViewNavigation} from 'react-native-webview';
import {apiClient} from '../../services/api';
import {RootStackParamList} from '../../components/Navigation';
import {
  buildCanvasTokenIssuerScript,
  CANVAS_BASE_URL,
  parseCanvasTokenIssuerMessage,
} from '../../services/auth/canvasSessionToken';

const CanvasLoginScreen = ({navigation}: NativeStackScreenProps<RootStackParamList>) => {
  const webViewRef = useRef<WebView>(null);
  const tokenRequestInFlightRef = useRef(false);
  const [isIssuingToken, setIsIssuingToken] = useState(false);
  const [isSavingToken, setIsSavingToken] = useState(false);
  const [loginState, setLoginState] = useState('K-LMS にログインしてください');
  const tokenIssuerScript = useMemo(() => buildCanvasTokenIssuerScript(), []);

  const handleTokenIssued = async (token: string) => {
    if (isSavingToken) {
      return;
    }

    setIsSavingToken(true);
    setLoginState('アクセストークンを保存しています');

    try {
      await apiClient.setToken(token);
      navigation.replace('HomeTabs');
    } catch (error) {
      console.error('Error saving issued token:', error);
      Alert.alert('Error', 'Failed to save the issued access token. Please try again.');
      setIsSavingToken(false);
      setLoginState('保存に失敗しました。もう一度ログインしてください');
    }
  };

  const handleMessage = (event: WebViewMessageEvent) => {
    const message = parseCanvasTokenIssuerMessage(event.nativeEvent.data);
    if (!message) {
      return;
    }

    if (message.type === 'not-authenticated') {
      tokenRequestInFlightRef.current = false;
      setIsIssuingToken(false);
      return;
    }

    if (message.type === 'token-issue-failed') {
      tokenRequestInFlightRef.current = false;
      setIsIssuingToken(false);
      setLoginState('トークン発行に失敗しました');
      Alert.alert('Error', message.reason);
      return;
    }

    tokenRequestInFlightRef.current = false;
    setIsIssuingToken(false);
    handleTokenIssued(message.token).then();
  };

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    if (navState.url.startsWith(CANVAS_BASE_URL)) {
      setLoginState('ログイン状態を確認しています');
      return;
    }

    setLoginState('認証ページを表示しています');
  };

  const handleLoadEnd = ({nativeEvent}: { nativeEvent: { url: string } }) => {
    if (
      isSavingToken ||
      tokenRequestInFlightRef.current ||
      !nativeEvent.url.startsWith(CANVAS_BASE_URL)
    ) {
      return;
    }

    tokenRequestInFlightRef.current = true;
    setIsIssuingToken(true);
    webViewRef.current?.injectJavaScript(tokenIssuerScript);
  };

  const reloadLogin = () => {
    setLoginState('K-LMS にログインしてください');
    webViewRef.current?.reload();
  };

  return (
    <View style={styles.container}>
      <YStack gap={12} padding={16} backgroundColor="$background" borderBottomWidth={1} borderColor="$borderColor">
        <Text fontSize={20} fontWeight="bold">
          KLMS Login
        </Text>
        <Text fontSize={14} opacity={0.75}>
          {loginState}
        </Text>
        <Button onPress={reloadLogin} disabled={isSavingToken}>
          Reload
        </Button>
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
              <ActivityIndicator size="large"/>
            </View>
          )}
        />

        {(isIssuingToken || isSavingToken) && (
          <View style={styles.statusOverlay} pointerEvents="none">
            <ActivityIndicator size="large"/>
            <Text marginTop={12}>{isSavingToken ? '保存しています' : 'トークンを発行しています'}</Text>
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
