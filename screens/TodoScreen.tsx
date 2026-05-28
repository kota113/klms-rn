import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated as RNAnimated,
  PanResponder,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Reanimated, {FadeIn, FadeOut, LinearTransition} from 'react-native-reanimated';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Text, XStack, YStack} from '../components/ui';
import {SkeletonText} from '../components/skeleton';
import {coursesService, DashboardCard, PlannerItem, plannerService} from '../services/api';
import TabHeader from '../components/TabHeader';
import {formatLocalDateKey, formatTodoDateLabel} from '../utils/todoDate';
import {TodoSnackbarHost, type TodoSnackbarHostRef} from '../components/TodoSnackbarHost';
import TodoHeaderMenu from '../components/TodoHeaderMenu';

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

const todoTitle = (item: PlannerItem): string => {
  return item.plannable?.name || item.plannable?.title || 'ToDo';
};

const todoDueAt = (item: PlannerItem): string | null => {
  return item.plannable?.due_at ?? item.plannable?.todo_date ?? item.plannable_date ?? null;
};

const todoTimeLabel = (item: PlannerItem): string => {
  const dueAt = todoDueAt(item);

  if (!dueAt) {
    return '時刻なし';
  }

  return new Date(dueAt).toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const todoDateKey = (item: PlannerItem): string => {
  const dueAt = todoDueAt(item);

  if (!dueAt) {
    return 'undated';
  }

  return formatLocalDateKey(new Date(dueAt));
};

const addDays = (date: Date, days: number): Date => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
};

const getPlannerDateRange = () => {
  const today = new Date();

  return {
    start_date: addDays(today, -14).toISOString(),
    end_date: addDays(today, 28).toISOString(),
  };
};

const isAssignmentItem = (item: PlannerItem): boolean => {
  return item.plannable_type === 'assignment';
};

const isSubmitted = (item: PlannerItem): boolean => {
  return typeof item.submissions === 'object'
    && item.submissions !== null
    && 'submitted' in item.submissions
    && item.submissions.submitted === true;
};

const isTodoComplete = (item: PlannerItem): boolean => {
  if (item.planner_override?.marked_complete === false) {
    return false;
  }

  return item.planner_override?.marked_complete === true || isSubmitted(item);
};

const withMarkedComplete = (item: PlannerItem, markedComplete: boolean): PlannerItem => ({
  ...item,
  planner_override: {
    id: item.planner_override?.id ?? -1,
    plannable_type: item.plannable_type,
    plannable_id: item.plannable_id,
    assignment_id: item.planner_override?.assignment_id,
    workflow_state: item.planner_override?.workflow_state,
    marked_complete: markedComplete,
    dismissed: item.planner_override?.dismissed ?? false,
    created_at: item.planner_override?.created_at,
    updated_at: item.planner_override?.updated_at,
    deleted_at: item.planner_override?.deleted_at,
  },
});

type SwipeableTodoItemProps = {
  item: PlannerItem;
  courseName?: string;
  completed?: boolean;
  disabled?: boolean;
  onPress: () => void;
  onSwipeAction: () => void;
};

function SwipeableTodoItem({item, courseName, completed, disabled, onPress, onSwipeAction}: SwipeableTodoItemProps) {
  const translateX = React.useRef(new RNAnimated.Value(0)).current;
  const isOpenRef = React.useRef(false);
  const courseInfo = courseName ? `・${courseName}` : '';
  const actionWidth = 96;

  const animatePosition = (toValue: number) => {
    RNAnimated.spring(translateX, {
      toValue,
      useNativeDriver: true,
    }).start();
  };

  const closeActions = () => {
    isOpenRef.current = false;
    animatePosition(0);
  };

  const openActions = () => {
    isOpenRef.current = true;
    animatePosition(-actionWidth);
  };

  const panResponder = React.useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return !disabled && Math.abs(gestureState.dx) > 8 && Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
    },
    onPanResponderMove: (_, gestureState) => {
      const startOffset = isOpenRef.current ? -actionWidth : 0;
      translateX.setValue(Math.max(Math.min(startOffset + gestureState.dx, 0), -actionWidth));
    },
    onPanResponderRelease: (_, gestureState) => {
      if ((!isOpenRef.current && gestureState.dx < -40) || (isOpenRef.current && gestureState.dx < 40)) {
        openActions();
        return;
      }

      closeActions();
    },
    onPanResponderTerminate: closeActions,
  }), [disabled, translateX]);

  const handleActionPress = () => {
    if (disabled) {
      return;
    }

    closeActions();
    onSwipeAction();
  };

  const handleContentPress = () => {
    if (isOpenRef.current) {
      closeActions();
      return;
    }

    onPress();
  };

  return (
    <Reanimated.View
      entering={FadeIn.duration(120)}
      exiting={FadeOut.duration(180)}
      layout={LinearTransition.duration(220)}
      style={[styles.swipeContainer, completed ? styles.incompleteSwipeContainer : styles.completeSwipeContainer]}
    >
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.completeAction}
        onPress={handleActionPress}
        disabled={disabled}
      >
        <MaterialCommunityIcons name={completed ? 'undo' : 'check'} size={22} color="#ffffff"/>
        <Text fontSize={13} fontWeight="700" color="#ffffff">{completed ? '未完了' : '完了'}</Text>
      </TouchableOpacity>
      <RNAnimated.View
        style={[styles.swipeContent, {transform: [{translateX}]}]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity activeOpacity={0.75} onPress={handleContentPress} disabled={disabled}>
          <XStack alignItems="center" justifyContent="space-between" gap="$3" paddingVertical="$3"
                  backgroundColor="white">
            <YStack flex={1} gap="$2">
              <Text
                fontSize={17}
                fontWeight="600"
                color={completed ? '#777' : '#333'}
                numberOfLines={1}
                style={completed ? styles.completedTitle : undefined}
              >
                {todoTitle(item)}
              </Text>
              <Text fontSize={13} color="#666">
                {courseInfo ? courseInfo.slice(1) : item.context_type}
              </Text>
            </YStack>
            <View style={styles.todoTime}>
              {completed ? (
                <MaterialCommunityIcons name="check-circle" size={17} color="#16a34a"/>
              ) : null}
              <Text fontSize={14} fontWeight="800" color="#333">
                {todoTimeLabel(item)}
              </Text>
            </View>
          </XStack>
        </TouchableOpacity>
      </RNAnimated.View>
    </Reanimated.View>
  );
}

export default function TodoScreen({navigation}: TodoScreenProps) {
  const [plannerItems, setPlannerItems] = useState<PlannerItem[]>([]);
  const [courses, setCourses] = useState<DashboardCard[]>([]);
  const [completingTodoKeys, setCompletingTodoKeys] = useState<Set<string>>(new Set());
  const [showCompleted, setShowCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const snackbarHostRef = useRef<TodoSnackbarHostRef>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [todoData, coursesData] = await Promise.all([
          plannerService.getPlannerItems(getPlannerDateRange()),
          coursesService.getDashboardCards(),
        ]);

        setPlannerItems(todoData);
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching todo items:', error);
        setPlannerItems([]);
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

  const todoItems = useMemo(() => {
    const assignmentItems = plannerItems.filter(isAssignmentItem);

    return showCompleted
      ? assignmentItems
      : assignmentItems.filter((item) => !isTodoComplete(item));
  }, [plannerItems, showCompleted]);

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
    const groups = new Map<string, PlannerItem[]>();

    sortedItems.forEach((item) => {
      const key = todoDateKey(item);
      groups.set(key, [...(groups.get(key) ?? []), item]);
    });

    return Array.from(groups.entries()).map(([dateKey, items]) => ({dateKey, items}));
  }, [todoItems]);

  const todoKey = (item: PlannerItem): string => {
    return `${item.plannable_type}-${item.plannable_id}`;
  };

  const setTodoItemComplete = async (item: PlannerItem, targetCompleteState: boolean) => {
    const key = todoKey(item);
    const previousPlannerItems = plannerItems;

    const restoreTodoItem = () => {
      setPlannerItems(previousPlannerItems);
    };

    setCompletingTodoKeys((currentKeys) => new Set(currentKeys).add(key));
    setPlannerItems((currentItems) => currentItems.map((todoItem) => (
      todoKey(todoItem) === key ? withMarkedComplete(todoItem, targetCompleteState) : todoItem
    )));

    try {
      const snackbarResult = await snackbarHostRef.current?.showSnackbar({
        message: targetCompleteState ? 'ToDoを完了しました' : 'ToDoを未完了に戻しました',
        actionLabel: '元に戻す',
        withDismissAction: true,
        duration: 'long',
      });

      if (snackbarResult === 'actionPerformed') {
        restoreTodoItem();
        return;
      }

      const plannerOverride = await plannerService.setPlannerItemComplete(item, targetCompleteState);
      setPlannerItems((currentItems) => currentItems.map((todoItem) => (
        todoKey(todoItem) === key ? {...todoItem, planner_override: plannerOverride} : todoItem
      )));
    } catch (error) {
      console.error('Error completing todo item:', error);
      restoreTodoItem();
    } finally {
      setCompletingTodoKeys((currentKeys) => {
        const nextKeys = new Set(currentKeys);
        nextKeys.delete(key);
        return nextKeys;
      });
    }
  };

  return (
    <YStack flex={1} backgroundColor="#ffffff" minHeight="100%">
      <TabHeader
        title="ToDo"
        rightElement={(
          <TodoHeaderMenu
            showCompleted={showCompleted}
            onShowCompletedChange={setShowCompleted}
          />
        )}
      />

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
                <Reanimated.View
                  key={dateKey}
                  entering={FadeIn.duration(120)}
                  exiting={FadeOut.duration(180)}
                  layout={LinearTransition.duration(220)}
                  style={styles.todoGroup}
                >
                  <XStack alignItems="center" gap="$3" marginBottom="$2">
                    <Text fontSize={15} color="#333">
                      {formatTodoDateLabel(dateKey)}
                    </Text>
                    <View style={styles.dateDivider}/>
                  </XStack>
                  {items.map((item) => {
                    const key = todoKey(item);
                    const courseName = item.course_id ? courseNameById.get(item.course_id) : item.context_name;
                    const completed = isTodoComplete(item);

                    return (
                      <SwipeableTodoItem
                        key={key}
                        item={item}
                        courseName={courseName}
                        completed={completed}
                        disabled={completingTodoKeys.has(key)}
                        onSwipeAction={() => setTodoItemComplete(item, !completed)}
                        onPress={() => {
                          const assignmentId = item.plannable?.id ?? item.plannable_id;
                          if (item.plannable_type === 'assignment' && item.course_id && assignmentId) {
                            navigation.navigate('AssignmentDetail', {
                              courseId: item.course_id,
                              assignmentId,
                              title: todoTitle(item),
                            });
                            return;
                          }

                          if (item.course_id) {
                            navigation.navigate('CourseDetail', {courseId: item.course_id, initialTab: 'assignments'});
                          }
                        }}
                      />
                    );
                  })}
                </Reanimated.View>
              );
            })
          ) : (
            <Text textAlign="center" marginTop="$6" color="#666">
              {showCompleted ? 'ToDoはありません' : '未完了のToDoはありません'}
            </Text>
          )}
        </ScrollView>
      )}
      <TodoSnackbarHost ref={snackbarHostRef}/>
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
    marginRight: 6
  },
  todoGroup: {
    marginBottom: 16,
  },
  swipeContainer: {
    overflow: 'hidden',
    position: 'relative',
  },
  completeSwipeContainer: {
    backgroundColor: '#000',
  },
  incompleteSwipeContainer: {
    backgroundColor: '#000',
  },
  completeAction: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 96,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  swipeContent: {
    backgroundColor: '#ffffff',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
  },
});
