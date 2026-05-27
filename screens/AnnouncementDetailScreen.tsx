import React, {useCallback, useEffect, useState} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../components/Navigation';
import {MessageThread, ThreadMessage} from '../components/MessageThread';
import {Text, XStack} from '../components/ui';
import {Announcement, announcementsService} from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'AnnouncementDetail'>;

export default function AnnouncementDetailScreen({navigation, route}: Props) {
  const {courseId, announcementId, title} = route.params;
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnnouncement = useCallback(async () => {
    try {
      setLoading(true);
      const data = await announcementsService.getCourseAnnouncement(courseId, announcementId);
      setAnnouncement(data);

      if (data.read_state === 'unread') {
        await announcementsService.markCourseAnnouncementRead(courseId, announcementId);
        setAnnouncement({...data, read_state: 'read'});
      }
    } catch (error) {
      console.error('Error fetching announcement:', error);
    } finally {
      setLoading(false);
    }
  }, [announcementId, courseId]);

  useEffect(() => {
    fetchAnnouncement();
  }, [fetchAnnouncement]);

  const openInWebView = () => {
    if (!announcement?.html_url) {
      Alert.alert('開けません', '表示先URLがありません。');
      return;
    }

    navigation.navigate('AuthenticatedWebView', {
      url: announcement.html_url,
      title: announcement.title,
    });
  };

  const postedAt = announcement?.posted_at || announcement?.delayed_post_at || '';
  const messages: ThreadMessage[] = announcement ? [{
    id: announcement.id.toString(),
    created_at: postedAt,
    body: announcement.message,
    authorName: announcement.author?.display_name || announcement.user_name || 'アナウンス',
    avatarUrl: announcement.author?.avatar_image_url || undefined,
    attachments: announcement.attachments,
  }] : [];

  return (
    <View style={styles.container}>
      <XStack
        alignItems="center"
        paddingHorizontal="$4"
        paddingVertical="$4"
        paddingBottom="$4"
        backgroundColor="white"
        gap="$2"
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back-ios" size={20} color="#333"/>
        </TouchableOpacity>
        <Text fontSize={17} fontWeight="700" color="#333" style={styles.headerTitle} numberOfLines={1}>
          {announcement?.title || title || 'アナウンス'}
        </Text>
      </XStack>

      <MessageThread messages={messages} loading={loading} emptyText="アナウンスがありません"/>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.openButton} onPress={openInWebView} activeOpacity={0.8}>
          <MaterialIcons name="open-in-new" size={18} color="#fff" style={{marginRight: 6}}/>
          <Text fontSize={15} fontWeight="600" color="#fff" numberOfLines={1} style={styles.openButtonText}>
            K-LMSで開く
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backButton: {
    paddingRight: 4,
    paddingVertical: 4,
  },
  footer: {
    padding: 14,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e0e0e0',
  },
  openButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 20,
  },
  headerTitle: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
  },
  openButtonText: {
    flexShrink: 1,
    minWidth: 0,
  },
});
