import {Text, YStack} from "../../../components/ui";
import {FileItem} from "./FileItem";
import {Alert, ScrollView, Text as RNText, View} from "react-native";
import React, {useEffect, useState} from "react";
import AssignmentItem from "../AssignmentsTab/AssignmentItem";
import {Module, ModuleItem, modulesService} from "../../../services/api";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../components/Navigation";
import {MaterialIcons} from "@expo/vector-icons";
import Animated, {FadeIn, FadeOut, LinearTransition} from "react-native-reanimated";
import * as WebBrowser from "expo-web-browser";
import PageItem from "./PageItem";
import ExternalLinkItem from "./ExternalLinkItem";
import DiscussionItem from "./DiscussionItem";
import QuizItem from "./QuizItem";
import ExternalToolItem from "./ExternalToolItem";
import SubHeaderItem from "./SubHeaderItem";
import ModulesSkeleton from "./ModulesSkeleton";

interface HomeTabProps {
  courseId: number;
}

const loadModulesWithItems = async (courseId: number): Promise<Module[]> => {
  const modulesData = await modulesService.getModules(courseId, {
    include: ['items', 'content_details']
  });

  return Promise.all(
    modulesData.map(async (module) => {
      if (module.items || module.items_count === 0) {
        return module;
      }

      const items = await modulesService.getModuleItems(courseId, module.id, {
        include: ['content_details'],
      });
      return {...module, items};
    })
  );
};

const formatModuleAssignmentDueDate = (value?: string | null) => {
  if (!value) {
    return 'なし';
  }

  return new Date(value).toLocaleString('ja-JP', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function HomeTab({courseId}: HomeTabProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [modules, setModules] = useState<Module[]>([]);
  const [expandedModuleIds, setExpandedModuleIds] = useState<Set<number>>(() => new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleModule = (moduleId: number) => {
    setExpandedModuleIds((current) => {
      const next = new Set(current);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true);
        setModules(await loadModulesWithItems(courseId));
        setError(null);
      } catch (err) {
        console.error('Error fetching modules:', err);
        setError('Failed to load modules. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchModules();
    }
  }, [courseId]);

  const openExternalUrl = async (item: ModuleItem) => {
    const url = item.external_url || item.html_url;
    if (!url) {
      Alert.alert("リンクを開けません", "リンク先URLがありません。");
      return;
    }

    try {
      await WebBrowser.openBrowserAsync(url);
    } catch (err) {
      console.error("Error opening external url:", err);
      Alert.alert("リンクを開けません", "外部リンクを開けませんでした。");
    }
  };

  const openAuthenticatedModuleItem = (item: ModuleItem) => {
    const url = item.html_url || item.url;
    if (!url) {
      Alert.alert("開けません", "表示先URLがありません。");
      return;
    }

    navigation.navigate("AuthenticatedWebView", {
      url,
      title: item.title,
    });
  };

  const renderModuleItem = (item: ModuleItem) => {
    switch (item.type) {
      case 'File':
        return (
          <FileItem
            key={item.id}
            title={item.title}
            onPress={() => {
              if (!item.html_url && !item.url) {
                Alert.alert("ファイルを開けません", "表示先URLがありません。");
                return;
              }

              navigation.navigate("AuthenticatedWebView", {
                url: item.html_url || item.url,
                downloadUrl: item.url,
                showFileActions: true,
                title: item.title,
              });
            }}
          />
        );
      case 'Page':
        return (
          <PageItem
            key={item.id}
            title={item.title}
            onPress={() => {
              if (item.page_url) {
                navigation.navigate("ModulePage", {
                  courseId,
                  pageUrl: item.page_url,
                  title: item.title,
                });
                return;
              }
              openAuthenticatedModuleItem(item);
            }}
          />
        );
      case 'Assignment':
        if (!item.content_id) {
          return null;
        }

        const assignmentId = item.content_id;
        return (
          <AssignmentItem
            key={item.id}
            id={item.id.toString()}
            title={item.title}
            dueDate={formatModuleAssignmentDueDate(item.content_details?.due_at)}
            onPress={() => navigation.navigate("AssignmentDetail", {
              courseId,
              assignmentId,
              title: item.title,
            })}
          />
        );
      case 'ExternalUrl':
        return (
          <ExternalLinkItem
            key={item.id}
            title={item.title}
            onPress={() => void openExternalUrl(item)}
          />
        );
      case 'Discussion':
        return (
          <DiscussionItem
            key={item.id}
            title={item.title}
            onPress={() => openAuthenticatedModuleItem(item)}
          />
        );
      case 'Quiz':
        return (
          <QuizItem
            key={item.id}
            title={item.title}
            onPress={() => openAuthenticatedModuleItem(item)}
          />
        );
      case 'ExternalTool':
        return (
          <ExternalToolItem
            key={item.id}
            title={item.title}
            onPress={() => openAuthenticatedModuleItem(item)}
          />
        );
      case 'SubHeader':
        return <SubHeaderItem key={item.id} title={item.title}/>;
      default:
        return null;
    }
  };

  if (loading) {
    return <ModulesSkeleton/>;
  }

  if (error) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="white">
        <Text color="red">{error}</Text>
        <View
          style={{
            marginTop: 20,
            padding: 10,
            backgroundColor: '#f0f0f0',
            borderRadius: 5
          }}
          onTouchEnd={() => {
            if (courseId) {
              setLoading(true);
              loadModulesWithItems(courseId)
                .then(data => {
                  setModules(data);
                  setError(null);
                })
                .catch(err => {
                  console.error('Error retrying modules fetch:', err);
                  setError('Failed to load modules. Please try again.');
                })
                .finally(() => setLoading(false));
            }
          }}
        >
          <Text>Retry</Text>
        </View>
      </YStack>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <YStack backgroundColor={"white"} minHeight={"100%"} paddingHorizontal={"$4.5"} paddingVertical={"$4"}>
        {modules.length > 0 ? (
          modules.map((module) => {
            const isExpanded = expandedModuleIds.has(module.id);

            return (
              <Animated.View key={module.id} layout={LinearTransition.duration(180)}>
                <YStack marginTop={"$2"} marginBottom={"$4"}>
                <View
                  accessibilityRole="button"
                  accessibilityState={{expanded: isExpanded}}
                  onTouchEnd={() => toggleModule(module.id)}
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    marginBottom: 12,
                    marginTop: 8,
                    paddingRight: 18,
                  }}
                >
                  <RNText style={{
                    color: "#111",
                    flex: 1,
                    fontSize: 16,
                    // fontWeight: "bold",
                  }}>
                    {module.name}
                  </RNText>
                  <MaterialIcons
                    name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                    size={24}
                    color="#333"
                  />
                </View>
                {isExpanded && module.items && module.items.length > 0 && (
                  <Animated.View
                    entering={FadeIn.duration(160)}
                    exiting={FadeOut.duration(120)}
                    layout={LinearTransition.duration(180)}
                  >
                    {module.items.map((item) => renderModuleItem(item))}
                  </Animated.View>
                )}
                </YStack>
              </Animated.View>
            );
          })
        ) : (
          <Text marginTop={"$6"} textAlign="center">このコースにモジュールがありません</Text>
        )}
      </YStack>
    </ScrollView>
  );
}
