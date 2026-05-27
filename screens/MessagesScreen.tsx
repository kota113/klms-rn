import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, XStack, YStack} from '../components/ui';
import {SkeletonText} from '../components/skeleton';
import {Conversation, conversationsService} from '../services/api';
import {MaterialIcons} from '@expo/vector-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../components/Navigation';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import TabHeader from '../components/TabHeader';

type Props = NativeStackScreenProps<RootStackParamList>;

const formatDate = (dateString: string | null): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString('ja-JP', {hour: '2-digit', minute: '2-digit'});
  } else if (diffDays === 1) {
    return '昨日';
  } else if (diffDays < 7) {
    return `${diffDays}日前`;
  } else {
    return date.toLocaleDateString('ja-JP', {month: 'numeric', day: 'numeric'});
  }
};

const getConversationTitle = (conversation: Conversation): string => {
  if (conversation.subject) return conversation.subject;
  const others = conversation.participants?.filter(p => p.id !== conversation.audience?.[0]);
  if (others && others.length > 0) return others.map(p => p.full_name || p.name).join(', ');
  return 'メッセージ';
};


export default function MessagesScreen({navigation}: Props) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const data = await conversationsService.getConversations({
        per_page: 50,
        include: ['participant_avatars'],
      });
      setConversations(data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      setConversations([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  const openConversation = (conversation: Conversation) => {
    navigation.navigate('ConversationDetail', {
      conversationId: conversation.id,
      title: getConversationTitle(conversation),
    });
  };

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <YStack flex={1} backgroundColor="#ffffff">
      <TabHeader title="メッセージ"/>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, {paddingBottom: tabBarHeight}]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          Array.from({length: 6}).map((_, index) => (
            <XStack key={index} alignItems="center" paddingVertical="$3" paddingHorizontal="$4.5" gap="$3">
              <YStack flex={1} gap="$2">
                <SkeletonText width="70%" height={15} />
                <SkeletonText width="90%" height={13} />
              </YStack>
            </XStack>
          ))
        ) : conversations.length > 0 ? (
          conversations.map((conversation) => {
            const isUnread = conversation.workflow_state === 'unread';
            return (
              <TouchableOpacity
                key={conversation.id}
                onPress={() => openConversation(conversation)}
                activeOpacity={0.7}
              >
                <XStack
                  alignItems="center"
                  paddingVertical="$3"
                  paddingHorizontal="$4.5"
                  backgroundColor="white"
                >
                  <YStack flex={1} justifyContent="space-between" gap="$1" style={styles.conversationContent}>
                    <XStack justifyContent="space-between" alignItems="flex-start" style={styles.titleRow}>
                      <Text
                        fontSize={15}
                        fontWeight={isUnread ? '700' : '400'}
                        color="#333"
                        numberOfLines={1}
                        style={styles.titleText}
                      >
                        {getConversationTitle(conversation)}
                      </Text>
                      <Text fontSize={12} color="#999" style={styles.dateText}>
                        {formatDate(conversation.last_message_at)}
                      </Text>
                    </XStack>
                    <Text
                      fontSize={13}
                      color={isUnread ? '#555' : '#999'}
                      numberOfLines={1}
                      style={styles.previewText}
                    >
                      {conversation.last_message || conversation.context_name || ''}
                    </Text>
                  </YStack>
                  {isUnread && <View style={styles.unreadDot} />}
                  <MaterialIcons name="chevron-right" size={20} color="#ccc" style={styles.chevron} />
                </XStack>
                <View style={styles.separator} />
              </TouchableOpacity>
            );
          })
        ) : (
          <YStack flex={1} alignItems="center" justifyContent="center" paddingTop="$10" paddingHorizontal="$4">
            <MaterialIcons name="mail-outline" size={48} color="#ccc" />
            <Text fontSize={16} color="#999" marginTop="$3" textAlign="center">
              メッセージはありません
            </Text>
          </YStack>
        )}
      </ScrollView>
    </YStack>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  conversationContent: {
    flexShrink: 1,
    minWidth: 0,
  },
  titleRow: {
    flexShrink: 1,
    minWidth: 0,
  },
  titleText: {
    flex: 1,
    minWidth: 0,
    flexShrink: 1,
    marginRight: 8,
  },
  dateText: {
    flexShrink: 0,
  },
  previewText: {
    minWidth: 0,
    flexShrink: 1,
    width: '100%',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4a90d9',
    marginLeft: 6,
    marginRight: 2,
  },
  chevron: {
    marginLeft: 4,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#f0f0f0',
    marginLeft: 18,
    marginRight: 18,
  },
});
