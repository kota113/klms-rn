import {XStack, YStack} from "@tamagui/stacks";
import {Image, Text} from "tamagui";
import React, {useEffect, useState} from "react";
import {FlatList, ScrollView, TouchableOpacity} from "react-native";
import AnnouncementItem from "./AnnouncementItem";
import AssignmentItem from "../CourseDetailScreen/AssignmentsTab/AssignmentItem";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../components/Navigation";
import {
  Announcement,
  announcementsService,
  Assignment,
  assignmentsService,
  coursesService,
  DashboardCard,
  UserColors,
  usersService
} from "../../services/api";


export default function DashboardScreen({navigation}: NativeStackScreenProps<RootStackParamList>) {
  const [courses, setCourses] = useState<DashboardCard[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [courseColors, setCourseColors] = useState<UserColors>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch courses using dashboard cards
        const coursesData = await coursesService.getDashboardCards();
        setCourses(coursesData);

        // Fetch user colors
        const colorsData = await usersService.getUserColors();
        setCourseColors(colorsData);

        if (coursesData && coursesData.length > 0) {
          // Extract course IDs
          const courseIds = coursesData.map(course => course.id);

          // Fetch announcements with course IDs
          const announcementsData = await announcementsService.getAnnouncements(courseIds, {
            start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // Last 30 days
            end_date: new Date().toISOString() // Today
          });
          setAnnouncements(announcementsData);
        } else {
          setAnnouncements([]);
        }

        // Fetch upcoming assignments
        const assignmentsData = await assignmentsService.getUpcomingAssignments();
        setAssignments(assignmentsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get color for a course from user colors or return a default color
  const getCourseColor = (courseId: number): string => {
    const assetString = usersService.formatCourseAssetString(courseId);
    return courseColors[assetString] || '#f0f0f0'; // Default light gray if no color is set
  };

  return (
    <YStack flex={1} backgroundColor="#ffffff" minHeight={"100%"}>
      <XStack
        alignItems="center"
        justifyContent="center"
        paddingHorizontal="$4"
        paddingVertical="$5"
        paddingBottom="$6"
        backgroundColor="white"
      >
        <Text fontSize={24} fontWeight="800" color="#333">
          ダッシュボード
        </Text>
      </XStack>
      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
        <YStack marginTop={"$2"}>
          <Text paddingHorizontal={"$4.5"} fontSize={22} fontWeight={"bold"} marginBottom={"$3"}>コース</Text>
          {loading ? (
            <Text paddingHorizontal={"$4.5"}>読込中...</Text>
          ) : (
            <FlatList
              style={{marginTop: 15}}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{paddingHorizontal: 20}}
              data={courses}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => {
                  navigation.navigate("CourseDetail", {courseId: item.id});
                }}>
                  <YStack marginRight={"$3"} width={175}>
                    <Image height={175} width={175} borderRadius={13}
                           backgroundColor={item.image_download_url ? undefined : getCourseColor(item.id)}
                           source={{uri: item.image_download_url || undefined}}/>
                    <Text fontSize={16} marginTop={"$4"} fontWeight={"bold"} numberOfLines={1}>{item.courseCode}</Text>
                  </YStack>
                </TouchableOpacity>
              )}
            />
          )}
        </YStack>
        <YStack marginTop={"$5"} paddingHorizontal={"$4.5"}>
          <Text fontSize={22} fontWeight={"bold"} marginVertical={"$3"}>最近のアナウンス</Text>
          {loading ? (
            <Text>Loading announcements...</Text>
          ) : announcements.length > 0 ? (
            announcements.slice(0, 2).map((announcement) => (
              <AnnouncementItem
                key={announcement.id.toString()}
                id={announcement.id.toString()}
                title={announcement.title}
                courseName={announcement.context_code.replace('course_', '')}
              />
            ))
          ) : (
            <Text>No announcements found</Text>
          )}
        </YStack>

        <YStack marginTop={"$5"} paddingHorizontal={"$4.5"}>
          <Text fontSize={22} fontWeight={"bold"} marginVertical={"$3"}>これからの課題</Text>
          {loading ? (
            <Text>Loading assignments...</Text>
          ) : assignments.length > 0 ? (
            assignments.slice(0, 2).map((assignment) => (
              <AssignmentItem
                key={assignment.id.toString()}
                id={assignment.id.toString()}
                title={assignment.name}
                courseName={courses.find(course => course.id === assignment.course_id)?.courseCode || ''}
                dueDate={assignment.due_at ? new Date(assignment.due_at).toLocaleDateString() : 'なし'}
                onPress={() => {
                  // Navigate to assignment detail
                }}
              />
            ))
          ) : (
            <Text>No upcoming assignments</Text>
          )}
        </YStack>
      </ScrollView>
    </YStack>
  )
}
