import {NativeStackScreenProps} from "@react-navigation/native-stack";
import React, {useCallback, useEffect, useState} from "react";
import {Alert, Platform, StyleSheet, TouchableOpacity, View} from "react-native";
import {WebView} from "react-native-webview";
import type {FileDownloadEvent, ShouldStartLoadRequest} from "react-native-webview/lib/WebViewTypes";
import {MaterialIcons} from "@expo/vector-icons";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import AndroidSaveCompleteDialog from "../components/AndroidSaveCompleteDialog";
import NativeLoadingIndicator from "../components/NativeLoadingIndicator";
import {Text, XStack, YStack} from "../components/ui";
import {RootStackParamList} from "../components/Navigation";
import {apiClient} from "../services/api";
import {
  downloadCanvasFile,
  isCanvasDownloadUrl,
  isFileActionCanceled,
  openDownloadedFile,
  saveDownloadedFile,
} from "../services/fileActions";

type Props = NativeStackScreenProps<RootStackParamList, "AuthenticatedWebView">;

type FileAction = "open" | "save";

export default function AuthenticatedWebViewScreen({navigation, route}: Props) {
  const {url, title = "ファイル", downloadUrl, showFileActions = false} = route.params;
  const insets = useSafeAreaInsets();
  const [isReady, setIsReady] = useState(false);
  const [activeAction, setActiveAction] = useState<FileAction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedFileName, setSavedFileName] = useState<string | null>(null);
  const isProcessing = activeAction !== null;

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

  const runFileAction = useCallback(async (action: FileAction, sourceUrl: string, fallbackUrl = sourceUrl) => {
    setActiveAction(action);

    try {
      const downloadedFile = await downloadCanvasFile(sourceUrl, fallbackUrl);
      if (!downloadedFile) {
        Alert.alert("ダウンロードできません", "一時保存先を利用できませんでした。");
        return;
      }

      if (action === "open") {
        await openDownloadedFile(downloadedFile);
      } else {
        const savedFileName = await saveDownloadedFile(downloadedFile);
        if (Platform.OS === "android") {
          setSavedFileName(savedFileName);
        } else {
          Alert.alert("保存しました", `${savedFileName} を保存しました。`);
        }
      }
    } catch (err) {
      if (isFileActionCanceled(err)) {
        return;
      }

      console.error("Error downloading WebView file:", err);
      Alert.alert("ダウンロードできません", "ファイルの取得に失敗しました。もう一度お試しください。");
    } finally {
      setActiveAction(null);
    }
  }, []);

  const handleFileDownload = useCallback((event: FileDownloadEvent) => {
    if (Platform.OS === "ios") {
      void runFileAction("open", event.nativeEvent.downloadUrl);
    }
  }, [runFileAction]);

  const handleShouldStartLoad = useCallback((request: ShouldStartLoadRequest) => {
    if (Platform.OS === "android" && isCanvasDownloadUrl(request.url)) {
      void runFileAction("open", request.url);
      return false;
    }

    return true;
  }, [runFileAction]);

  const handleOpenPress = useCallback(() => {
    void runFileAction("open", downloadUrl || url, url);
  }, [downloadUrl, runFileAction, url]);

  const handleSavePress = useCallback(() => {
    void runFileAction("save", downloadUrl || url, url);
  }, [downloadUrl, runFileAction, url]);

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
            allowFileAccess
            allowsBackForwardNavigationGestures
            domStorageEnabled
            javaScriptCanOpenWindowsAutomatically
            mediaCapturePermissionGrantType="prompt"
            onFileDownload={handleFileDownload}
            onShouldStartLoadWithRequest={handleShouldStartLoad}
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
        {!error && isReady && showFileActions ? (
          <View
            pointerEvents="box-none"
            style={[
              styles.fileActionButtonContainer,
              {paddingBottom: Math.max(insets.bottom, 15)},
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.85}
              disabled={isProcessing}
              onPress={handleSavePress}
              style={[
                styles.fileActionButton,
                styles.saveButton,
                isProcessing ? styles.fileActionButtonDisabled : null,
                isProcessing ? styles.saveButtonDisabled : null,
              ]}
            >
              {activeAction === "save" ? (
                <View style={styles.fileActionButtonIcon}>
                  <NativeLoadingIndicator color="#111111" size={20}/>
                </View>
              ) : (
                <MaterialIcons name="file-download" size={20} color="#111111" style={styles.fileActionButtonIcon}/>
              )}
              <Text fontSize={16} fontWeight="800" color="#111111" textAlign="center">
                ダウンロード
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.85}
              disabled={isProcessing}
              onPress={handleOpenPress}
              style={[
                styles.fileActionButton,
                isProcessing ? styles.fileActionButtonDisabled : null,
              ]}
            >
              {activeAction === "open" ? (
                <View style={styles.fileActionButtonIcon}>
                  <NativeLoadingIndicator color="#fff" size={20}/>
                </View>
              ) : (
                <MaterialIcons name="open-in-new" size={20} color="#fff" style={styles.fileActionButtonIcon}/>
              )}
              <Text fontSize={16} fontWeight="800" color="#fff" textAlign="center">
                開く
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      <AndroidSaveCompleteDialog fileName={savedFileName} onDismiss={() => setSavedFileName(null)}/>
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
  fileActionButton: {
    alignItems: "center",
    backgroundColor: "#111111",
    borderRadius: 8,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    minHeight: 52,
    paddingHorizontal: 16,
  },
  fileActionButtonContainer: {
    backgroundColor: "transparent",
    bottom: 0,
    flexDirection: "row",
    gap: 10,
    left: 0,
    paddingHorizontal: 18,
    paddingTop: 12,
    position: "absolute",
    right: 0,
  },
  fileActionButtonDisabled: {
    backgroundColor: "#999999",
  },
  fileActionButtonIcon: {
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: "#ffffff",
    borderColor: "#111111",
    borderWidth: 1,
  },
  saveButtonDisabled: {
    borderWidth: 0,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
