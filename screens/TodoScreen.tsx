import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, XStack, YStack} from '../components/ui';
import {SkeletonText} from '../components/skeleton';
import {assignmentsService, coursesService, DashboardCard, TodoItem} from '../services/api';

type TodoScreenProps = {
  navigation: {
    navigate: (screen: string, params?: {
      courseId?: number;
      initialTab?: 'assignments';
      assignmentId?: number;
      title?: string;
    }) => void;
  };
};

const todoTitle = (item: TodoItem): string => {
  return item.assignment?.name || item.quiz?.title || 'ToDo';
};

const todoDueAt = (item: TodoItem): string | null => {
  return item.assignment?.due_at ?? null;
};

const todoTimeLabel = (item: TodoItem): string => {
  const dueAt = todoDueAt(item);

  if (!dueAt) {
    return '時刻なし';
  }

  return new Date(dueAt).toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const todoDateKey = (item: TodoItem): string => {
  const dueAt = todoDueAt(item);

  if (!dueAt) {
    return 'undated';
  }

  return new Date(dueAt).toISOString().slice(0, 10);
};

const todoDateLabel = (dateKey: string): string => {
  if (dateKey === 'undated') {
    return '期限なし';
  }

  return new Date(`${dateKey}T00:00:00`).toLocaleDateString('ja-JP', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });
};

export default function TodoScreen({navigation}: TodoScreenProps) {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [courses, setCourses] = useState<DashboardCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [todoData, coursesData] = await Promise.all([
          assignmentsService.getTodoItems({include: ['ungraded_quizzes']}),
          coursesService.getDashboardCards(),
        ]);

        setTodoItems(todoData);
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching todo items:', error);
        setTodoItems([]);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const courseNameById = useMemo(() => {
    return new Map(courses.map((course) => [course.id, course.courseCode]));
  }, [courses]);

  const groupedTodoItems = useMemo(() => {
    const sortedItems = [...todoItems].sort((a, b) => {
      const aDueAt = todoDueAt(a);
      const bDueAt = todoDueAt(b);

      if (!aDueAt && !bDueAt) {
        return todoTitle(a).localeCompare(todoTitle(b), 'ja');
      }

      if (!aDueAt) {
        return 1;
      }

      if (!bDueAt) {
        return -1;
      }

      return new Date(aDueAt).getTime() - new Date(bDueAt).getTime();
    });
    const groups = new Map<string, TodoItem[]>();

    sortedItems.forEach((item) => {
      const key = todoDateKey(item);
      groups.set(key, [...(groups.get(key) ?? []), item]);
    });

    return Array.from(groups.entries()).map(([dateKey, items]) => ({dateKey, items}));
  }, [todoItems]);

  return (
    <YStack flex={1} backgroundColor="#ffffff" minHeight="100%">
      <XStack
        alignItems="center"
        justifyContent="center"
        paddingHorizontal="$4"
        paddingVertical="$5"
        paddingBottom="$6"
        backgroundColor="white"
      >
        <Text fontSize={22} fontWeight="800" color="#333">
          {"　ToDo　"}
        </Text>
      </XStack>

      {loading ? (
        <YStack paddingHorizontal="$4.5">
          {Array.from({length: 3}).map((_, groupIndex) => (
            <YStack key={groupIndex} marginBottom="$4">
              <XStack alignItems="center" gap="$3" marginBottom="$2">
                <SkeletonText width={96} height={15}/>
                <View style={styles.dateDivider}/>
              </XStack>
              {Array.from({length: 2}).map((_, itemIndex) => (
                <XStack key={itemIndex} alignItems="center" justifyContent="space-between" gap="$3" paddingVertical="$3">
                  <YStack flex={1} gap="$2">
                    <SkeletonText width="72%" height={17}/>
                    <SkeletonText width="38%" height={13}/>
                  </YStack>
                  <SkeletonText width={48} height={14}/>
                </XStack>
              ))}
            </YStack>
          ))}
        </YStack>
      ) : (
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{paddingHorizontal: 18, paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
        >
          {todoItems.length > 0 ? (
            groupedTodoItems.map(({dateKey, items}) => {
              return (
                <YStack key={dateKey} marginBottom="$4">
                  <XStack alignItems="center" gap="$3" marginBottom="$2">
                    <Text fontSize={15} fontWeight="700" color="#333">
                      {todoDateLabel(dateKey)}
                    </Text>
                    <View style={styles.dateDivider}/>
                  </XStack>
                  {items.map((item, index) => {
                    const courseName = courseNameById.get(item.course_id);
                    const courseInfo = courseName ? `・${courseName}` : '';

                    return (
                      <TouchableOpacity
                        key={`${item.type}-${item.course_id}-${item.assignment?.id ?? item.html_url}-${index}`}
                        activeOpacity={0.75}
                        onPress={() => {
                          if (item.assignment?.id) {
                            navigation.navigate('AssignmentDetail', {
                              courseId: item.course_id,
                              assignmentId: item.assignment.id,
                              title: item.assignment.name,
                            });
                            return;
                          }

                          navigation.navigate('CourseDetail', {courseId: item.course_id, initialTab: 'assignments'});
                        }}
                      >
                        <XStack alignItems="center" justifyContent="space-between" gap="$3" paddingVertical="$3" backgroundColor="white">
                          <YStack flex={1} gap="$2">
                            <Text fontSize={17} fontWeight="600" color="#333" numberOfLines={1}>
                              {todoTitle(item)}
                            </Text>
                            <Text fontSize={13} color="#666">
                              {courseInfo ? courseInfo.slice(1) : item.context_type}
                            </Text>
                          </YStack>
                          <View style={styles.todoTime}>
                            <Text fontSize={14} fontWeight="800" color="#333">
                              {todoTimeLabel(item)}
                            </Text>
                          </View>
                        </XStack>
                      </TouchableOpacity>
                    );
                  })}
                </YStack>
              );
            })
          ) : (
            <Text textAlign="center" marginTop="$6" color="#666">
              ToDoはありません
            </Text>
          )}
        </ScrollView>
      )}
    </YStack>
  );
}

const styles = StyleSheet.create({
  dateDivider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  todoTime: {
    width: 56,
    alignItems: 'flex-end',
  },
});
