import {MaterialIcons} from "@expo/vector-icons";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import React, {useEffect, useMemo, useState} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {WebView} from "react-native-webview";
import NativeLoadingIndicator from "../components/NativeLoadingIndicator";
import {Text, XStack, YStack} from "../components/ui";
import {RootStackParamList} from "../components/Navigation";
import {apiClient, pagesService} from "../services/api";
import type {Page} from "../services/api";

type Props = NativeStackScreenProps<RootStackParamList, "ModulePage">;

const CANVAS_BASE_URL = "https://lms.keio.jp";

const escapeHtml = (value: string) => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

const buildPageHtml = (page: Page, fallbackTitle: string) => {
  const title = escapeHtml(page.title || fallbackTitle);
  const body = page.body || "<p>本文はありません。</p>";

  return `<!doctype html>
<html lang="ja">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <style>
    :root {
      color-scheme: light;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
    }
    body {
      background: #ffffff;
      color: #222222;
      font-size: 16px;
      line-height: 1.7;
      margin: 0;
      padding: 18px;
      word-wrap: break-word;
    }
    h1 {
      color: #222222;
      font-size: 24px;
      line-height: 1.25;
      margin: 0 0 18px;
    }
    h2, h3, h4 {
      color: #222222;
      line-height: 1.35;
      margin: 22px 0 10px;
    }
    p, ul, ol, table, blockquote {
      margin-top: 0;
      margin-bottom: 16px;
    }
    a {
      color: #2563eb;
      text-decoration: underline;
    }
    img, video, iframe {
      height: auto;
      max-width: 100%;
    }
    table {
      border-collapse: collapse;
      max-width: 100%;
      width: 100%;
    }
    th, td {
      border: 1px solid #dddddd;
      padding: 8px;
      vertical-align: top;
    }
    blockquote {
      border-left: 4px solid #dddddd;
      color: #555555;
      padding-left: 12px;
    }
    pre, code {
      background: #f5f5f5;
      border-radius: 6px;
      font-family: Menlo, Consolas, monospace;
    }
    pre {
      overflow-x: auto;
      padding: 12px;
    }
  </style>
</head>
<body>
  <h1>${title}</h1>
  ${body}
</body>
</html>`;
};

export default function ModulePageScreen({navigation, route}: Props) {
  const {courseId, pageUrl, title = "ページ"} = route.params;
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [isWebViewReady, setIsWebViewReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      pagesService.getPage(courseId, pageUrl),
      apiClient.prepareAuthenticatedWebView(CANVAS_BASE_URL),
    ])
      .then(([pageData]) => {
        if (!isMounted) {
          return;
        }

        setPage(pageData);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching module page:", err);
        if (isMounted) {
          setError("ページを読み込めませんでした。");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [courseId, pageUrl]);

  const html = useMemo(() => {
    return page ? buildPageHtml(page, title) : "";
  }, [page, title]);

  return (
    <YStack flex={1} backgroundColor="white">
      <XStack alignItems="center" backgroundColor="white" paddingHorizontal="$4" paddingVertical="$4">
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="chevron-left" size={24} color="#333"/>
        </TouchableOpacity>
        <Text fontSize={18} color="#333" numberOfLines={1}>
          {page?.title || title}
        </Text>
      </XStack>

      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingOverlay}>
            <NativeLoadingIndicator/>
          </View>
        ) : error || !page ? (
          <YStack flex={1} alignItems="center" justifyContent="center" paddingHorizontal="$4">
            <Text color="red" textAlign="center">{error || "ページが見つかりませんでした。"}</Text>
          </YStack>
        ) : (
          <>
            <WebView
              source={{html, baseUrl: CANVAS_BASE_URL}}
              sharedCookiesEnabled
              thirdPartyCookiesEnabled
              allowsBackForwardNavigationGestures
              domStorageEnabled
              startInLoadingState
              onLoadEnd={() => setIsWebViewReady(true)}
              renderLoading={() => (
                <View style={styles.loadingOverlay}>
                  <NativeLoadingIndicator/>
                </View>
              )}
            />
            {!isWebViewReady ? (
              <View style={styles.loadingOverlay}>
                <NativeLoadingIndicator/>
              </View>
            ) : null}
          </>
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
