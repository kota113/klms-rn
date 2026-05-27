import React, {useEffect, useState} from "react";
import {Alert, ScrollView, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Text, XStack, YStack} from "../../../components/ui";
import {Skeleton, SkeletonText} from "../../../components/skeleton";
import AnnouncementItem from "../../DashboardScreen/AnnouncementItem";
import {RootStackParamList} from "../../../components/Navigation";
import {Announcement, announcementsService} from "../../../services/api";

interface AnnouncementsTabProps {
  courseId: number;
}

const formatPostedAt = (value?: string | null) => {
  if (!value) {
    return "投稿日なし";
  }

  return new Date(value).toLocaleString("ja-JP", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function AnnouncementsTab({courseId}: AnnouncementsTabProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const markAnnouncementRead = (announcementId: number) => {
    setAnnouncements((currentAnnouncements) => (
      currentAnnouncements.map((announcement) => (
        announcement.id === announcementId
          ? {...announcement, read_state: "read"}
          : announcement
      ))
    ));
  };

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const announcementsData = await announcementsService.getCourseAnnouncements(courseId);
        setAnnouncements(announcementsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching course announcements:", err);
        setError("アナウンスを読み込めませんでした");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchAnnouncements();
    }
  }, [courseId]);

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <YStack backgroundColor="white" minHeight="100%" paddingHorizontal="$4.5" paddingVertical="$4">
        {loading ? (
          Array.from({length: 4}).map((_, index) => (
            <XStack key={index} alignItems="center" paddingVertical="$2" gap="$2">
              <Skeleton width={48} height={48}/>
              <YStack flex={1} gap="$2">
                <SkeletonText width="76%" height={17}/>
                <SkeletonText width="42%" height={13}/>
              </YStack>
            </XStack>
          ))
        ) : error ? (
          <Text marginTop="$6" textAlign="center" color="red">{error}</Text>
        ) : announcements.length > 0 ? (
          announcements.map((announcement) => (
            <AnnouncementItem
              key={announcement.id.toString()}
              id={announcement.id.toString()}
              title={announcement.title}
              courseName={formatPostedAt(announcement.posted_at || announcement.delayed_post_at)}
              rightElement={announcement.read_state === "unread" ? (
                <View
                  accessibilityLabel="未読"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#2563eb",
                    marginLeft: 4,
                  }}
                />
              ) : undefined}
              onPress={() => {
                if (!announcement.html_url) {
                  Alert.alert("開けません", "表示先URLがありません。");
                  return;
                }

                markAnnouncementRead(announcement.id);
                navigation.navigate("AuthenticatedWebView", {
                  url: announcement.html_url,
                  title: announcement.title,
                });
              }}
            />
          ))
        ) : (
          <Text marginTop="$6" textAlign="center">アナウンスはありません</Text>
        )}
      </YStack>
    </ScrollView>
  );
}
