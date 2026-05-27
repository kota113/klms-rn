import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {Text, XStack, YStack} from '../components/ui';
import {Skeleton, SkeletonText} from '../components/skeleton';
import {CalendarEvent, calendarService, coursesService, DashboardCard, usersService} from '../services/api';
import TabHeader from '../components/TabHeader';

type CalendarScreenProps = {
  navigation: {
    navigate: (screen: string, params?: { courseId: number; initialTab?: 'assignments' }) => void;
  };
};

const eventDateValue = (event: CalendarEvent): string | null => {
  return event.start_at ?? event.all_day_date ?? event.assignment?.due_at ?? null;
};

const eventDateKey = (event: CalendarEvent): string => {
  const dateValue = eventDateValue(event);

  if (!dateValue) {
    return 'undated';
  }

  return new Date(dateValue).toISOString().slice(0, 10);
};

const eventTimeLabel = (event: CalendarEvent): string => {
  const startAt = event.start_at ?? event.assignment?.due_at;

  if (!startAt) {
    return '時刻なし';
  }

  return new Date(startAt).toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const MAX_VISIBLE_DAY_ITEMS = 2;

const contextCodeToCourseId = (contextCode: string): number | null => {
  if (!contextCode.startsWith('course_')) {
    return null;
  }

  const courseId = Number(contextCode.replace('course_', ''));
  return Number.isNaN(courseId) ? null : courseId;
};

const dateToKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const addMonths = (date: Date, amount: number): Date => {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
};

const getMonthDays = (monthDate: Date): Date[] => {
  const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const gridStart = new Date(firstDay);
  gridStart.setDate(firstDay.getDate() - firstDay.getDay());

  return Array.from({length: 42}, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    return date;
  });
};

export default function CalendarScreen({navigation}: CalendarScreenProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [courses, setCourses] = useState<DashboardCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleMonth, setVisibleMonth] = useState(() => new Date());
  const [selectedDateKey, setSelectedDateKey] = useState(() => dateToKey(new Date()));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesData = await coursesService.getDashboardCards();
        const contextCodes = coursesData
          .slice(0, 10)
          .map((course) => usersService.formatCourseAssetString(course.id));
        setCourses(coursesData);

        if (contextCodes.length === 0) {
          setEvents([]);
          return;
        }

        const startDate = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1).toISOString();
        const endDate = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 0, 23, 59, 59).toISOString();
        const calendarEvents = await calendarService.getCalendarEvents({
          type: 'assignment',
          start_date: startDate,
          end_date: endDate,
          context_codes: contextCodes,
        });

        setEvents(calendarEvents);
      } catch (error) {
        console.error('Error fetching calendar events:', error);
        setCourses([]);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [visibleMonth]);

  const courseNameByContextCode = useMemo(() => {
    return new Map(courses.map((course) => [usersService.formatCourseAssetString(course.id), course.courseCode]));
  }, [courses]);

  const eventsByDate = useMemo(() => {
    const groups = new Map<string, CalendarEvent[]>();

    events.forEach((event) => {
      const key = eventDateKey(event);
      groups.set(key, [...(groups.get(key) ?? []), event]);
    });

    return groups;
  }, [events]);

  const monthDays = useMemo(() => getMonthDays(visibleMonth), [visibleMonth]);
  const selectedEvents = useMemo(() => {
    return [...(eventsByDate.get(selectedDateKey) ?? [])].sort((a, b) => {
      const aDate = eventDateValue(a);
      const bDate = eventDateValue(b);

      if (!aDate && !bDate) {
        return a.title.localeCompare(b.title, 'ja');
      }

      if (!aDate) {
        return 1;
      }

      if (!bDate) {
        return -1;
      }

      return new Date(aDate).getTime() - new Date(bDate).getTime();
    });
  }, [eventsByDate, selectedDateKey]);
  const visibleMonthLabel = visibleMonth.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
  });
  const selectedDateLabel = new Date(`${selectedDateKey}T00:00:00`).toLocaleDateString('ja-JP', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });

  return (
    <YStack flex={1} backgroundColor="#ffffff" minHeight="100%">
      <TabHeader title="カレンダー"/>

      {loading ? (
        <YStack paddingHorizontal="$4.5">
          <XStack alignItems="center" justifyContent="space-between" marginBottom="$4">
            <Skeleton width={28} height={28} variant="rounded"/>
            <SkeletonText width={120} height={20}/>
            <Skeleton width={28} height={28} variant="rounded"/>
          </XStack>
          <View style={styles.monthGrid}>
            {Array.from({length: 7}).map((_, index) => (
              <View key={`weekday-${index}`} style={styles.weekdayCell}>
                <SkeletonText width={14} height={12}/>
              </View>
            ))}
            {Array.from({length: 42}).map((_, index) => (
              <View key={index} style={styles.dayCell}>
                <SkeletonText width={18} height={13}/>
                {index % 4 === 0 ? <Skeleton height={18} width="100%" style={{marginTop: 6}}/> : null}
              </View>
            ))}
          </View>
          <YStack marginTop="$5">
            <XStack alignItems="center" gap="$3" marginBottom="$2">
              <SkeletonText width={104} height={15}/>
              <View style={styles.dateDivider}/>
            </XStack>
            {Array.from({length: 2}).map((_, index) => (
              <XStack key={index} alignItems="center" justifyContent="space-between" gap="$3" paddingVertical="$3">
                <YStack flex={1} gap="$2">
                  <SkeletonText width="70%" height={17}/>
                  <SkeletonText width="36%" height={13}/>
                </YStack>
                <SkeletonText width={48} height={14}/>
              </XStack>
            ))}
          </YStack>
        </YStack>
      ) : (
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{paddingHorizontal: 18, paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
        >
          <XStack alignItems="center" justifyContent="space-between" marginBottom="$4">
            <TouchableOpacity onPress={() => setVisibleMonth((month) => addMonths(month, -1))}>
              <MaterialIcons name="chevron-left" size={28} color="#333"/>
            </TouchableOpacity>
            <Text fontSize={20} fontWeight="800" color="#333">
              {visibleMonthLabel}
            </Text>
            <TouchableOpacity onPress={() => setVisibleMonth((month) => addMonths(month, 1))}>
              <MaterialIcons name="chevron-right" size={28} color="#333"/>
            </TouchableOpacity>
          </XStack>

          <View style={styles.monthGrid}>
            {['日', '月', '火', '水', '木', '金', '土'].map((weekday) => (
              <View key={weekday} style={styles.weekdayCell}>
                <Text fontSize={12} fontWeight="700" color="#666">
                  {weekday}
                </Text>
              </View>
            ))}
            {monthDays.map((date) => {
              const dateKey = dateToKey(date);
              const dayEvents = eventsByDate.get(dateKey) ?? [];
              const isCurrentMonth = date.getMonth() === visibleMonth.getMonth();
              const isSelected = dateKey === selectedDateKey;
              const visibleDayEvents = dayEvents.length > MAX_VISIBLE_DAY_ITEMS
                ? dayEvents.slice(0, MAX_VISIBLE_DAY_ITEMS - 1)
                : dayEvents.slice(0, MAX_VISIBLE_DAY_ITEMS);
              const remainingEventCount = dayEvents.length - visibleDayEvents.length;

              return (
                <TouchableOpacity
                  key={dateKey}
                  activeOpacity={0.75}
                  style={[
                    styles.dayCell,
                    isSelected ? styles.selectedDayCell : null,
                    !isCurrentMonth ? styles.outsideMonthDayCell : null,
                  ]}
                  onPress={() => setSelectedDateKey(dateKey)}
                >
                  <Text fontSize={13} fontWeight={isSelected ? '800' : '600'} color={isCurrentMonth ? '#333' : '#999'}>
                    {date.getDate()}
                  </Text>
                  {visibleDayEvents.map((event) => (
                    <View key={`${event.id}`} style={styles.eventPill}>
                      <Text fontSize={10} fontWeight="700" color="#333" numberOfLines={1}>
                        {event.title}
                      </Text>
                    </View>
                  ))}
                  {remainingEventCount > 0 ? (
                    <View style={styles.eventPill}>
                      <Text fontSize={10} fontWeight="700" color="#666">
                        +{remainingEventCount}
                      </Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </View>

          <YStack marginTop="$5">
            <XStack alignItems="center" gap="$3" marginBottom="$2">
              <Text fontSize={15} fontWeight="700" color="#333">
                {selectedDateLabel}
              </Text>
              <View style={styles.dateDivider}/>
            </XStack>
            {selectedEvents.length > 0 ? (
              selectedEvents.map((event, index) => {
                const contextLabel = courseNameByContextCode.get(event.context_code) ?? event.context_name ?? event.context_code;
                const courseId = contextCodeToCourseId(event.context_code);

                return (
                  <TouchableOpacity
                    key={`${event.id}-${index}`}
                    activeOpacity={0.75}
                    disabled={!courseId}
                    onPress={() => {
                      if (courseId) {
                        navigation.navigate('CourseDetail', {courseId, initialTab: 'assignments'});
                      }
                    }}
                  >
                    <XStack alignItems="center" justifyContent="space-between" gap="$3" paddingVertical="$3" backgroundColor="white">
                      <YStack flex={1} gap="$2">
                        <Text fontSize={17} fontWeight="600" color="#333" numberOfLines={1}>
                          {event.title}
                        </Text>
                        <Text fontSize={13} color="#666">
                          {contextLabel}
                        </Text>
                      </YStack>
                      <View style={styles.assignmentTime}>
                        <Text fontSize={14} fontWeight="800" color="#333">
                          {eventTimeLabel(event)}
                        </Text>
                      </View>
                    </XStack>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text textAlign="center" marginTop="$6" color="#666">
                この日の予定はありません
              </Text>
            )}
          </YStack>
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
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  weekdayCell: {
    width: `${100 / 7}%`,
    alignItems: 'center',
    paddingBottom: 8,
  },
  dayCell: {
    width: `${100 / 7}%`,
    minHeight: 78,
    padding: 5,
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
    overflow: 'hidden',
  },
  selectedDayCell: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  outsideMonthDayCell: {
    opacity: 0.45,
  },
  eventPill: {
    alignSelf: 'stretch',
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    marginTop: 6,
    maxWidth: '100%',
    paddingHorizontal: 4,
    paddingVertical: 3,
    overflow: 'hidden',
  },
  assignmentTime: {
    width: 56,
    alignItems: 'flex-end',
  },
});
