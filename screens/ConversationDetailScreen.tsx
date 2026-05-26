import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text, XStack, YStack} from '../components/ui';
import {MaterialIcons} from '@expo/vector-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../components/Navigation';
import {ConversationDetail, ConversationMessage, conversationsService} from '../services/api';
import {SkeletonText} from '../components/skeleton';

type Props = NativeStackScreenProps<RootStackParamList, 'ConversationDetail'>;

const formatMessageTime = (dateString: string): string => {
  const date = new Date(dateString);
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

export default function ConversationDetailScreen({navigation, route}: Props) {
  const {conversationId, title} = route.params;
  const [conversation, setConversation] = useState<ConversationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef<FlatList<ConversationMessage>>(null);

  const fetchConversation = useCallback(async () => {
    try {
      const data = await conversationsService.getConversation(conversationId);
      setConversation(data);
    } catch (error) {
      console.error('Error fetching conversation:', error);
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  useEffect(() => {
    fetchConversation();
  }, [fetchConversation]);

  const openInWebView = () => {
    navigation.navigate('AuthenticatedWebView', {
      url: `https://lms.keio.jp/conversations#${conversationId}`,
      title: title || 'メッセージ',
    });
  };

  const getAuthorName = (authorId: string): string => {
    if (!conversation) return '';
    const participant = conversation.participants?.find(p => p.id === authorId);
    return participant?.full_name || participant?.name || '';
  };

  const getAuthorAvatarUrl = (authorId: string): string | undefined => {
    if (!conversation) return undefined;
    const participant = conversation.participants?.find(p => p.id === authorId);
    return participant?.avatar_url;
  };

  const renderMessage = ({item, index}: {item: ConversationMessage; index: number}) => {
    const authorName = getAuthorName(item.author_id);
    const avatarUrl = getAuthorAvatarUrl(item.author_id);
    const bodyText = stripHtml(item.body);
    const initials = authorName ? authorName.charAt(0).toUpperCase() : '?';

    return (
      <View style={[styles.messageContainer, index > 0 && styles.messageWithBorder]}>
        <XStack alignItems="flex-start" gap={12}>
          <View style={styles.avatarContainer}>
            {avatarUrl ? (
              <Image source={{uri: avatarUrl}} style={styles.avatarImage} />
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
                {authorName}
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
                    <MaterialIcons name="attach-file" size={14} color="#888" />
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

  return (
    <View style={styles.container}>
      {/* ヘッダー */}
      <XStack
        alignItems="center"
        paddingHorizontal="$4"
        paddingVertical="$4"
        paddingBottom="$4"
        backgroundColor="white"
        gap="$2"
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back-ios" size={20} color="#333" />
        </TouchableOpacity>
        <Text fontSize={17} fontWeight="700" color="#333" style={styles.headerTitle} numberOfLines={1}>
          {title || 'メッセージ'}
        </Text>
      </XStack>

      {/* メッセージ一覧 */}
      {loading ? (
        <YStack flex={1} padding="$4" gap="$4">
          {Array.from({length: 3}).map((_, i) => (
            <YStack key={i} gap="$2">
              <SkeletonText width="40%" height={13} />
              <SkeletonText width="90%" height={13} />
              <SkeletonText width="75%" height={13} />
            </YStack>
          ))}
        </YStack>
      ) : (
        <FlatList
          ref={flatListRef}
          data={conversation?.messages ?? []}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messageList}
          ListEmptyComponent={
            <YStack flex={1} alignItems="center" justifyContent="center" paddingTop="$10">
              <Text fontSize={15} color="#999">
                メッセージがありません
              </Text>
            </YStack>
          }
        />
      )}

      {/* K-LMSで開くボタン */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.openButton} onPress={openInWebView} activeOpacity={0.8}>
          <MaterialIcons name="open-in-new" size={18} color="#fff" style={{marginRight: 6}} />
          <Text fontSize={15} fontWeight="600" color="#fff" numberOfLines={1} style={styles.openButtonText}>
            返信など(K-LMSで開く)
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
