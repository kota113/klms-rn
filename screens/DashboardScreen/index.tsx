import {Image, Text, XStack, YStack} from "../../components/ui";
import React, {useEffect, useState} from "react";
import {Alert, ScrollView, Share, StyleSheet, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import AnnouncementItem from "./AnnouncementItem";
import AssignmentItem from "../CourseDetailScreen/AssignmentsTab/AssignmentItem";
import {Skeleton, SkeletonText} from "../../components/skeleton";
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
import TabHeader from "../../components/TabHeader";

const APP_SHARE_URL = "https://play.google.com/store/apps/details?id=com.kota113.klms";
const APP_SHARE_CONFIG_URL = "https://k-app.kota113.com/share-url.json";

type AppShareConfig = {
  shareUrl?: unknown;
};

export default function DashboardScreen({navigation}: NativeStackScreenProps<RootStackParamList>) {
  const [courses, setCourses] = useState<DashboardCard[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [courseColors, setCourseColors] = useState<UserColors>({});
  const [loading, setLoading] = useState(true);
  const {width} = useWindowDimensions();
  const courseColumnCount = width >= 720 ? 5 : width >= 520 ? 4 : 3;
  const courseTileWidth = Math.floor((width - 36 - (courseColumnCount - 1) * 10) / courseColumnCount);

  useEffect(() => {
    const isUnauthorizedError = (error: unknown) => {
      return typeof error === 'object'
        && error !== null
        && 'response' in error
        && (error as { response?: { status?: number } }).response?.status === 401;
    };

    const fetchData = async () => {
      try {
        // Fetch courses using dashboard cards
        const coursesData = await coursesService.getDashboardCards();
        setCourses(coursesData);

        // Fetch user colors
        const colorsData = await usersService.getUserColors().catch(() => ({}));
        setCourseColors(colorsData);

        if (coursesData.length > 0) {
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
        if (isUnauthorizedError(error)) {
          navigation.replace('Login');
        }
        setCourses([]);
        setAnnouncements([]);
        setAssignments([]);
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

  const getAnnouncementCourseId = (announcement: Announcement): number | null => {
    const match = announcement.context_code.match(/^course_(\d+)$/);
    return match ? Number(match[1]) : null;
  };

  const handleShareApp = async () => {
    try {
      const response = await fetch(APP_SHARE_CONFIG_URL);
      const config = await response.json() as AppShareConfig;
      const shareUrl = typeof config.shareUrl === "string" && config.shareUrl.length > 0
        ? config.shareUrl
        : APP_SHARE_URL;
      const shareMessage = `K-appでKLMSの課題やお知らせを確認できます。\n${shareUrl}`;

      await Share.share({
        title: "K-app",
        message: shareMessage,
        url: shareUrl,
      });
    } catch (error) {
      console.error("Error sharing app:", error);
      Alert.alert("共有できません", "共有シートを開けませんでした。もう一度お試しください。");
    }
  };

  return (
    <YStack flex={1} backgroundColor="#ffffff" minHeight={"100%"}>
      <TabHeader
        title="ダッシュボード"
        rightElement={
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="K-appを共有"
            activeOpacity={0.7}
            onPress={handleShareApp}
            style={styles.shareButton}
          >
            <MaterialIcons name="ios-share" size={22} color="#333"/>
          </TouchableOpacity>
        }
      />
      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
        <YStack marginTop={"$2"}>
          <XStack
            alignItems="center"
            justifyContent="space-between"
            paddingHorizontal="$4.5"
            marginBottom="$3"
          >
            <Text fontSize={20} fontWeight={"bold"}>コース</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Courses")}
            >
              <Text fontSize={14} color="#333">全て表示</Text>
            </TouchableOpacity>
          </XStack>
          {loading ? (
            <View style={styles.courseGrid}>
              {Array.from({length: courseColumnCount * 2}).map((_, index) => (
                <View key={index} style={[styles.courseTile, {width: courseTileWidth}]}>
                  <Skeleton height={courseTileWidth * 0.7} width={courseTileWidth}/>
                  <SkeletonText width="72%" height={13} style={{marginTop: 8}}/>
                </View>
              ))}
            </View>
          ) : courses.length > 0 ? (
            <View style={styles.courseGrid}>
              {courses.map((item) => (
                <TouchableOpacity
                  key={item.id.toString()}
                  activeOpacity={0.75}
                  style={[styles.courseTile, {width: courseTileWidth}]}
                  onPress={() => {
                    navigation.navigate("CourseDetail", {courseId: item.id});
                  }}
                >
                  <Image
                    height={courseTileWidth * 0.6}
                    width={courseTileWidth}
                    borderRadius={8}
                    backgroundColor={item.image_download_url ? undefined : getCourseColor(item.id)}
                    source={{uri: item.image_download_url || undefined}}
                  />
                  <Text fontSize={13} marginTop={"$2"} fontWeight={"bold"} numberOfLines={2}>{item.courseCode}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text paddingHorizontal={18} textAlign="left" marginTop="$3" color="#666">
              現在履修中のコースはありません
            </Text>
          )}
        </YStack>

        <YStack marginTop={"$5"} paddingHorizontal={"$4.5"}>
          <XStack
            alignItems="center"
            justifyContent="space-between"
            marginVertical={"$3"}
          >
            <Text fontSize={20} fontWeight={"bold"}>これからの課題</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => (navigation as any).navigate("Todo")}
            >
              <Text fontSize={14} color="#333">全て表示</Text>
            </TouchableOpacity>
          </XStack>
          {loading ? (
            Array.from({length: 2}).map((_, index) => (
              <XStack key={index} alignItems="center" paddingVertical="$3" gap="$2">
                <Skeleton width={59} height={59}/>
                <YStack flex={1} gap="$2">
                  <SkeletonText width="76%" height={17}/>
                  <SkeletonText width="48%" height={13}/>
                </YStack>
              </XStack>
            ))
          ) : assignments.length > 0 ? (
            assignments.slice(0, 2).map((assignment) => (
              <AssignmentItem
                key={assignment.id.toString()}
                title={assignment.name}
                courseName={courses.find(course => course.id === assignment.course_id)?.courseCode || ''}
                dueDate={assignment.due_at ? new Date(assignment.due_at).toLocaleDateString() : 'なし'}
                onPress={() => navigation.navigate("AssignmentDetail", {
                  courseId: assignment.course_id,
                  assignmentId: assignment.id,
                  title: assignment.name,
                })}
                titleStyle={styles.dashboardAssignmentTitle}
              />
            ))
          ) : (
            <Text textAlign="left" marginTop="$3" color="#666">
              これからの課題はありません
            </Text>
          )}
        </YStack>
        <YStack marginTop={"$5"} paddingHorizontal={"$4.5"}>
          <Text fontSize={20} fontWeight={"bold"} marginVertical={"$3"}>最近のアナウンス</Text>
          {loading ? (
            Array.from({length: 2}).map((_, index) => (
              <XStack key={index} alignItems="center" paddingVertical="$3" gap="$2">
                <Skeleton width={59} height={59}/>
                <YStack flex={1} gap="$2">
                  <SkeletonText width="76%" height={17}/>
                  <SkeletonText width="48%" height={13}/>
                </YStack>
              </XStack>
            ))
          ) : announcements.length > 0 ? (
            announcements.slice(0, 2).map((announcement) => (
              <AnnouncementItem
                key={announcement.id.toString()}
                title={announcement.title}
                courseName={announcement.author?.display_name}
                onPress={() => {
                  const courseId = getAnnouncementCourseId(announcement);
                  if (!courseId) {
                    return;
                  }

                  navigation.navigate("AnnouncementDetail", {
                    courseId,
                    announcementId: announcement.id,
                    title: announcement.title,
                  });
                }}
              />
            ))
          ) : (
            <Text textAlign="left" marginTop="$3" color="#666">
              最近のアナウンスはありません
            </Text>
          )}
        </YStack>
      </ScrollView>
    </YStack>
  )
}

const styles = StyleSheet.create({
  courseGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingHorizontal: 18,
    paddingTop: 4,
  },
  courseTile: {
    marginBottom: 8,
  },
  dashboardAssignmentTitle: {
    fontWeight: '700',
  },
  shareButton: {
    alignItems: "center",
    height: 44,
    justifyContent: "center",
    width: 44,
  },
});
