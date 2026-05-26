import React from 'react';
import {Image, ScrollView, StyleSheet, Text as RNText, TouchableOpacity, View} from 'react-native';
import {Text, YStack} from '../../components/ui';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../components/Navigation';
export const ONBOARDING_COMPLETED_KEY = 'onboarding_completed';

const OnboardingScreen = ({navigation}: NativeStackScreenProps<RootStackParamList>) => {
  const handleStart = () => {
    navigation.replace('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Image
            source={require('../../assets/icon.png')}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.appName}>K-LMS</Text>
        </View>

        <YStack gap={20} style={styles.featuresSection}>
          <FeatureItem
            emoji="📚"
            title="コースを管理"
            description="履修中のコースをひとつのアプリでまとめて確認できます。"
          />
          <FeatureItem
            emoji="✅"
            title="課題・ToDoを把握"
            description="提出期限が近い課題や未完了のタスクを一覧で確認できます。"
          />
          <FeatureItem
            emoji="📣"
            title="お知らせを確認"
            description="各コースからのアナウンスをまとめてチェックできます。"
          />
          <FeatureItem
            emoji="📅"
            title="カレンダーで予定を管理"
            description="課題の締め切りや授業スケジュールをカレンダー形式で確認できます。"
          />
        </YStack>

        <View style={styles.bottomSection}>
          <TouchableOpacity
            activeOpacity={0.82}
            onPress={handleStart}
            style={styles.startButton}
          >
            <RNText style={styles.startButtonText}>はじめる</RNText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

type FeatureItemProps = {
  emoji: string;
  title: string;
  description: string;
};

const FeatureItem = ({emoji, title, description}: FeatureItemProps) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureEmoji}>{emoji}</Text>
    <View style={styles.featureText}>
      <RNText style={styles.featureTitle}>{title}</RNText>
      <RNText style={styles.featureDescription}>{description}</RNText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  icon: {
    width: 96,
    height: 96,
    borderRadius: 20,
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 15,
    color: '#666',
  },
  featuresSection: {
    flex: 1,
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    width: '100%',
  },
  featureEmoji: {
    fontSize: 28,
    lineHeight: 36,
    width: 36,
    textAlign: 'center',
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  bottomSection: {
    alignItems: 'center',
    gap: 16,
  },
  startButton: {
    alignItems: 'center',
    backgroundColor: '#111111',
    borderRadius: 8,
    minHeight: 52,
    justifyContent: 'center',
    paddingHorizontal: 16,
    width: '100%',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  note: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default OnboardingScreen;
