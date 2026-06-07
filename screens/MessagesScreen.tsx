import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, XStack, YStack} from '../components/ui';
import {SkeletonText} from '../components/skeleton';
import {Conversation, conversationsService} from '../services/api';
import {MaterialIcons} from '@expo/vector-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../components/Navigation';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import TabHeader from '../components/TabHeader';
import NativeLoadingIndicator from '../components/NativeLoadingIndicator';

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
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const page = await conversationsService.getConversationsPage({
        per_page: 50,
        include: ['participant_avatars'],
      });
      setConversations(page.data);
      setNextUrl(page.nextUrl);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      setConversations([]);
      setNextUrl(null);
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
    setConversations([]);
    setNextUrl(null);
    fetchData();
  }, [fetchData]);

  const loadMore = useCallback(async () => {
    if (!nextUrl || loadingMore) return;
    setLoadingMore(true);
    try {
      const page = await conversationsService.getConversationsPage(nextUrl);
      setConversations(prev => [...prev, ...page.data]);
      setNextUrl(page.nextUrl);
    } catch (error) {
      console.error('Error loading more conversations:', error);
    } finally {
      setLoadingMore(false);
    }
  }, [nextUrl, loadingMore]);

  const openConversation = (conversation: Conversation) => {
    navigation.navigate('ConversationDetail', {
      conversationId: conversation.id,
      title: getConversationTitle(conversation),
    });
  };

  const tabBarHeight = useBottomTabBarHeight();

  const renderItem = useCallback(({item: conversation}: { item: Conversation }) => {
    const isUnread = conversation.workflow_state === 'unread';
    return (
      <TouchableOpacity
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
          {isUnread && <View style={styles.unreadDot}/>}
          <MaterialIcons name="chevron-right" size={20} color="#ccc" style={styles.chevron}/>
        </XStack>
        <View style={styles.separator}/>
      </TouchableOpacity>
    );
  }, []);

  return (
    <YStack flex={1} backgroundColor="#ffffff">
      <TabHeader title="メッセージ"/>

      {loading ? (
        <YStack flex={1}>
          {Array.from({length: 6}).map((_, index) => (
            <XStack key={index} alignItems="center" paddingVertical="$3" paddingHorizontal="$4.5" gap="$3">
              <YStack flex={1} gap="$2">
                <SkeletonText width="70%" height={15}/>
                <SkeletonText width="90%" height={13}/>
              </YStack>
            </XStack>
          ))}
        </YStack>
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={styles.list}
          contentContainerStyle={[
            styles.listContent,
            {paddingBottom: tabBarHeight},
            conversations.length === 0 && styles.listContentEmpty,
          ]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            loadingMore ? (
              <YStack alignItems="center" paddingVertical="$4">
                <NativeLoadingIndicator size={28}/>
              </YStack>
            ) : null
          }
          ListEmptyComponent={
            <YStack flex={1} alignItems="center" justifyContent="center" paddingTop="$10" paddingHorizontal="$4">
              <MaterialIcons name="mail-outline" size={48} color="#ccc"/>
              <Text fontSize={16} color="#999" marginTop="$3" textAlign="center">
                メッセージはありません
              </Text>
            </YStack>
          }
        />
      )}
    </YStack>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },
  listContentEmpty: {
    flex: 1,
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
