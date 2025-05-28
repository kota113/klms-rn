import {YStack} from "@tamagui/stacks";
import {FileItem} from "./FileItem";
import {ActivityIndicator, ScrollView, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Text} from "tamagui";
import AssignmentItem from "../AssignmentsTab/AssignmentItem";
import {Module, ModuleItem, modulesService} from "../../../services/api";

interface HomeTabProps {
  courseId: number;
}

export default function HomeTab({courseId}: HomeTabProps) {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        return <FileItem key={item.id} title={item.title} onPress={() => window.open(item.url, '_blank')}/>;
      case 'Assignment':
        return (
          <AssignmentItem
            key={item.id}
            id={item.id.toString()}
            title={item.title}
            dueDate={item.content_details?.due_at ? new Date(item.content_details.due_at).toLocaleDateString() : 'なし'}
            onPress={() => window.open(item.html_url, '_blank')}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="white">
        <ActivityIndicator size="large" color="black"/>
        <Text marginTop="$4">読込中...</Text>
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
          modules.map((module) => (
            <YStack key={module.id} marginTop={"$2"} marginBottom={"$4"}>
              <Text fontSize={22} marginTop={"$2"} marginBottom={"$3"} fontWeight={"bold"}>
                {module.name}
              </Text>
              {module.items && module.items.length > 0 && (
                module.items.map((item) => renderModuleItem(item))
              )}
            </YStack>
          ))
        ) : (
          <Text marginTop={"$6"} textAlign="center">このコースにモジュールがありません</Text>
        )}
      </YStack>
    </ScrollView>
  );
}
