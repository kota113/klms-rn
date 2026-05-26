import {Text, YStack} from "../../../components/ui";
import {FileItem} from "./FileItem";
import {ScrollView, Text as RNText, View} from "react-native";
import React, {useEffect, useState} from "react";
import AssignmentItem from "../AssignmentsTab/AssignmentItem";
import {Skeleton, SkeletonText} from "../../../components/skeleton";
import {Module, ModuleItem, modulesService} from "../../../services/api";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../components/Navigation";
import {MaterialIcons} from "@expo/vector-icons";
import Animated, {FadeIn, FadeOut, LinearTransition} from "react-native-reanimated";

interface HomeTabProps {
  courseId: number;
}

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
        // Fetch modules with items included
        const modulesData = await modulesService.getModules(courseId, {
          include: ['items']
        });
        setModules(modulesData);
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

  // Helper function to render a module item based on its type
  const renderModuleItem = (item: ModuleItem) => {
    switch (item.type) {
      case 'File':
        return (
          <FileItem
            key={item.id}
            title={item.title}
            onPress={() => navigation.navigate("AuthenticatedWebView", {
              url: item.html_url || item.url,
              downloadUrl: item.url,
              showFileActions: true,
              title: item.title,
            })}
          />
        );
      case 'Assignment':
        return (
          <AssignmentItem
            key={item.id}
            id={item.id.toString()}
            title={item.title}
            dueDate={item.content_details?.due_at ? new Date(item.content_details.due_at).toLocaleDateString() : 'なし'}
            onPress={() => navigation.navigate("AssignmentDetail", {
              courseId,
              assignmentId: item.content_id,
              title: item.title,
            })}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <YStack flex={1} backgroundColor="white" paddingHorizontal="$4.5" paddingVertical="$4">
        {Array.from({length: 2}).map((_, sectionIndex) => (
          <YStack key={sectionIndex} marginTop="$2" marginBottom="$4">
            <SkeletonText width="62%" height={22} style={{marginTop: 8, marginBottom: 12}}/>
            {Array.from({length: 2}).map((__, itemIndex) => (
              <YStack key={itemIndex} marginBottom="$3">
                <Skeleton width="100%" height={58}/>
              </YStack>
            ))}
          </YStack>
        ))}
      </YStack>
    );
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
              modulesService.getModules(courseId, {include: ['items']})
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
