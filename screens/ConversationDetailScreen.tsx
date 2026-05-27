import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View,} from 'react-native';
import {Text, XStack} from '../components/ui';
import {MaterialIcons} from '@expo/vector-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../components/Navigation';
import {ConversationDetail, conversationsService} from '../services/api';
import {MessageThread, ThreadMessage} from '../components/MessageThread';

type Props = NativeStackScreenProps<RootStackParamList, 'ConversationDetail'>;

export default function ConversationDetailScreen({navigation, route}: Props) {
  const {conversationId, title} = route.params;
  const [conversation, setConversation] = useState<ConversationDetail | null>(null);
  const [loading, setLoading] = useState(true);

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

  const messages: ThreadMessage[] = (conversation?.messages ?? []).map((message) => ({
    id: message.id,
    created_at: message.created_at,
    body: message.body,
    authorName: getAuthorName(message.author_id),
    avatarUrl: getAuthorAvatarUrl(message.author_id),
    attachments: message.attachments,
  }));

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

      <MessageThread messages={messages} loading={loading} emptyText="メッセージがありません"/>

      {/* K-LMSで開くボタン */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.openButton} onPress={openInWebView} activeOpacity={0.8}>
          <MaterialIcons name="open-in-new" size={18} color="#fff" style={{marginRight: 6}} />
          <Text fontSize={15} fontWeight="600" color="#fff" numberOfLines={1} style={styles.openButtonText}>
            返信など (K-LMSで開く)
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
