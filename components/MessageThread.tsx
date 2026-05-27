import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {Text, XStack, YStack} from './ui';
import {Skeleton, SkeletonText} from './skeleton';

export type ThreadAttachment = {
  id: string | number;
  display_name: string;
};

export type ThreadMessage = {
  id: string;
  created_at: string;
  body: string | null;
  authorName: string;
  avatarUrl?: string;
  attachments?: ThreadAttachment[];
};

const formatMessageTime = (dateString: string): string => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) {
    return date.toLocaleTimeString('ja-JP', {hour: '2-digit', minute: '2-digit'});
  } else if (diffDays === 1) {
    return '昨日 ' + date.toLocaleTimeString('ja-JP', {hour: '2-digit', minute: '2-digit'});
  } else if (diffDays < 7) {
    return `${diffDays}日前`;
  } else {
    return date.toLocaleDateString('ja-JP', {month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
  }
};

const stripHtml = (html: string | null): string => {
  if (!html) return '';
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
};

const renderMessageSkeleton = (index: number) => {
  const bodyLineWidths = index % 2 === 0 ? ['92%', '78%'] : ['86%', '58%'];

  return (
    <View key={index} style={[styles.messageContainer, index > 0 && styles.messageWithBorder]}>
      <XStack alignItems="flex-start" gap={12}>
        <View style={styles.avatarContainer}>
          <Skeleton width={38} height={38} variant="rounded"/>
        </View>
        <YStack flex={1} minWidth={0}>
          <XStack justifyContent="space-between" alignItems="center" marginBottom={8} style={styles.messageHeader}>
            <SkeletonText width="34%" height={15} style={styles.authorText}/>
            <SkeletonText width={44} height={11} style={styles.messageTimeText}/>
          </XStack>
          <YStack gap={6}>
            {bodyLineWidths.map((width, lineIndex) => (
              <SkeletonText key={lineIndex} width={width} height={14}/>
            ))}
          </YStack>
          {index === 1 ? (
            <XStack alignItems="center" gap={4} marginTop={10} style={styles.attachmentRow}>
              <Skeleton width={14} height={14} variant="rounded"/>
              <SkeletonText width="42%" height={12} style={styles.attachmentText}/>
            </XStack>
          ) : null}
        </YStack>
      </XStack>
    </View>
  );
};

export function MessageThread({messages, loading, emptyText}: {
  messages: ThreadMessage[];
  loading: boolean;
  emptyText: string;
}) {
  const renderMessage = ({item, index}: { item: ThreadMessage; index: number }) => {
    const bodyText = stripHtml(item.body);
    const initials = item.authorName ? item.authorName.charAt(0).toUpperCase() : '?';

    return (
      <View style={[styles.messageContainer, index > 0 && styles.messageWithBorder]}>
        <XStack alignItems="flex-start" gap={12}>
          <View style={styles.avatarContainer}>
            {item.avatarUrl ? (
              <Image source={{uri: item.avatarUrl}} style={styles.avatarImage}/>
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text fontSize={16} fontWeight="bold" color="#fff">
                  {initials}
                </Text>
              </View>
            )}
          </View>
          <YStack flex={1} minWidth={0}>
            <XStack justifyContent="space-between" alignItems="center" marginBottom={4} style={styles.messageHeader}>
              <Text fontSize={15} fontWeight="bold" color="#555" numberOfLines={1} style={styles.authorText}>
                {item.authorName}
              </Text>
              <Text fontSize={11} color="#bbb" style={styles.messageTimeText}>
                {formatMessageTime(item.created_at)}
              </Text>
            </XStack>
            <Text fontSize={14} color="#333" style={styles.messageBody}>
              {bodyText}
            </Text>
            {item.attachments && item.attachments.length > 0 && (
              <YStack marginTop={8} gap={4}>
                {item.attachments.map(att => (
                  <XStack key={att.id} alignItems="center" gap={4} style={styles.attachmentRow}>
                    <MaterialIcons name="attach-file" size={14} color="#888"/>
                    <Text fontSize={12} color="#888" numberOfLines={1} style={styles.attachmentText}>
                      {att.display_name}
                    </Text>
                  </XStack>
                ))}
              </YStack>
            )}
          </YStack>
        </XStack>
      </View>
    );
  };

  if (loading) {
    return (
      <YStack flex={1}>
        {Array.from({length: 4}).map((_, index) => renderMessageSkeleton(index))}
      </YStack>
    );
  }

  return (
    <FlatList
      data={messages}
      keyExtractor={item => item.id}
      renderItem={renderMessage}
      contentContainerStyle={styles.messageList}
      ListEmptyComponent={
        <YStack flex={1} alignItems="center" justifyContent="center" paddingTop="$10">
          <Text fontSize={15} color="#999">
            {emptyText}
          </Text>
        </YStack>
      }
    />
  );
}

const styles = StyleSheet.create({
  messageList: {
    flexGrow: 1,
  },
  messageContainer: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    backgroundColor: 'white',
  },
  messageHeader: {
    flexShrink: 1,
    minWidth: 0,
    width: '100%',
  },
  authorText: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    marginRight: 8,
  },
  messageTimeText: {
    flexShrink: 0,
  },
  messageBody: {
    lineHeight: 20,
    minWidth: 0,
    flexShrink: 1,
    width: '100%',
  },
  attachmentRow: {
    flexShrink: 1,
    minWidth: 0,
    width: '100%',
  },
  attachmentText: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
  },
  avatarContainer: {
    width: 38,
    height: 38,
    flexShrink: 0,
    marginTop: 2,
  },
  avatarImage: {
    width: 38,
    height: 38,
    borderRadius: 20,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#a0a0a0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageWithBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eeeeee',
  },
});
