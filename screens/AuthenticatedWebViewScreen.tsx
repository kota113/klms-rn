import {NativeStackScreenProps} from "@react-navigation/native-stack";
import React, {useEffect, useState} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {WebView} from "react-native-webview";
import {MaterialIcons} from "@expo/vector-icons";
import NativeLoadingIndicator from "../components/NativeLoadingIndicator";
import {Text, XStack, YStack} from "../components/ui";
import {RootStackParamList} from "../components/Navigation";
import {apiClient} from "../services/api";

type Props = NativeStackScreenProps<RootStackParamList, "AuthenticatedWebView">;

export default function AuthenticatedWebViewScreen({navigation, route}: Props) {
  const {url, title = "ファイル"} = route.params;
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    apiClient.prepareAuthenticatedWebView(url)
      .then((prepared) => {
        if (!isMounted) {
          return;
        }

        if (!prepared) {
          setError("認証情報を読み込めませんでした。もう一度ログインしてください。");
          return;
        }

        setIsReady(true);
      })
      .catch((err) => {
        console.error("Error preparing authenticated WebView:", err);
        if (isMounted) {
          setError("ファイルを開けませんでした。");
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return (
    <YStack flex={1} backgroundColor="white">
      <XStack alignItems="center" backgroundColor="white" paddingHorizontal="$4" paddingVertical="$4">
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="chevron-left" size={24} color="#333"/>
        </TouchableOpacity>
        <Text fontSize={18} color="#333" numberOfLines={1}>
          {title}
        </Text>
      </XStack>

      <View style={styles.content}>
        {error ? (
          <YStack flex={1} alignItems="center" justifyContent="center" paddingHorizontal="$4">
            <Text color="red" textAlign="center">{error}</Text>
          </YStack>
        ) : isReady ? (
          <WebView
            source={{uri: url}}
            sharedCookiesEnabled
            thirdPartyCookiesEnabled
            startInLoadingState
            renderLoading={() => (
              <View style={styles.loadingOverlay}>
                <NativeLoadingIndicator/>
              </View>
            )}
          />
        ) : (
          <View style={styles.loadingOverlay}>
            <NativeLoadingIndicator/>
          </View>
        )}
      </View>
    </YStack>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
