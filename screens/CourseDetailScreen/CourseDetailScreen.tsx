import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, Dimensions, Animated, View } from 'react-native';
import { XStack, YStack } from '@tamagui/stacks';
import { MaterialIcons } from '@expo/vector-icons';
import { TabButton } from "./TabButton";
import HomeTab from "./HomeTab";
import AssignmentsTab from "./AssignmentsTab";
import GradesTab from "./GradesTab";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../components/Navigation";

const { width } = Dimensions.get('window');

const CourseDetailScreen = ({navigation}: NativeStackScreenProps<RootStackParamList>) => {
  const [activeTab, setActiveTab] = useState(1);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  // Refs for tab text positions
  const tab1Ref = useRef<View>(null);
  const tab2Ref = useRef<View>(null);
  const tab3Ref = useRef<View>(null);

  // Store measured positions, widths, and center coordinates
  const [tabPositions, setTabPositions] = useState<{x: number, width: number, center: number}[]>([
    {x: 15, width: 40, center: 35}, // Default values
    {x: 85, width: 40, center: 105},
    {x: 155, width: 40, center: 175}
  ]);

  // Set initial scroll position on mount
  useEffect(() => {
    // Use a small timeout to ensure the ScrollView is fully rendered
    const timer = setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        x: activeTab * width,
        animated: false
      });
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  // Update scroll position when activeTab changes
  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: activeTab * width,
      animated: true
    });
  }, [activeTab]);

  // Handle scroll event to update activeTab
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  // Update activeTab when scrolling ends
  const handleScrollEnd = (event: any) => {
    const position = event.nativeEvent.contentOffset.x;
    const index = Math.round(position / width);
    if (activeTab !== index) {
      setActiveTab(index);
    }
  };

  // Measure tab positions after component mounts
  useEffect(() => {
    const measureTabs = () => {
      setTimeout(() => {
        // Measure each tab text position
        const measureTab = (ref: React.RefObject<View | null>, index: number) => {
          ref.current?.measureInWindow((x, y, width, height) => {
            setTabPositions(prev => {
              const newPositions = [...prev];
              // Calculate the center position of the tab text
              const center = x + (width / 2);
              newPositions[index] = { x, width, center };
              return newPositions;
            });
          });
        };

        measureTab(tab1Ref, 0);
        measureTab(tab2Ref, 1);
        measureTab(tab3Ref, 2);
      }, 500); // Delay to ensure components are rendered
    };

    measureTabs();
  }, []);

  return (
    <YStack flex={1} backgroundColor="#f8f9fa">
      {/* Header */}
      <XStack
        alignItems="center"
        paddingHorizontal="$4"
        paddingVertical="$4"
        backgroundColor="white"
      >
        <TouchableOpacity style={{ marginRight: 16 }} onPress={() => navigation.goBack()}>
          <MaterialIcons name="chevron-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '800', color: '#333' }}>
          [月3]保田 隆明　経営分析 [湘南藤沢 Ω22]
        </Text>
      </XStack>

      {/* Tab Navigation */}
      <XStack backgroundColor="white" borderBottomWidth={1} paddingHorizontal={"$3"} borderBottomColor="#e0e0e0" position="relative">
        <TabButton title="ホーム" isActive={activeTab === 0} onPress={() => setActiveTab(0)} textRef={tab1Ref} />
        <TabButton title="課題" isActive={activeTab === 1} onPress={() => setActiveTab(1)} textRef={tab2Ref} />
        <TabButton title="成績" isActive={activeTab === 2} onPress={() => setActiveTab(2)} textRef={tab3Ref} />

        {/* Animated Tab Indicator */}
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            // Position the indicator centered under the first tab's text
            left: tabPositions[0].center - (tabPositions[0].width / 2),
            width: tabPositions[0].width, // Use measured width of first tab
            height: 4,
            backgroundColor: '#000000',
            transform: [{
              translateX: scrollX.interpolate({
                inputRange: [0, width, width * 2],
                outputRange: [
                  0,
                  // Use the difference between tab centers
                  tabPositions[1].center - tabPositions[0].center,
                  // Use the difference between tab centers
                  tabPositions[2].center - tabPositions[0].center
                ], // Use measured center positions
                extrapolate: 'clamp'
              })
            }],
            // Additional transform to adjust width based on active tab
            scaleX: scrollX.interpolate({
              inputRange: [0, width, width * 2],
              outputRange: [
                1,
                tabPositions[1].width / tabPositions[0].width,
                tabPositions[2].width / tabPositions[0].width
              ], // Use measured widths
              extrapolate: 'clamp'
            })
          }}
        />
      </XStack>

      {/* Content */}
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ width, flex: 1 }}>
          <HomeTab />
        </View>
        <View style={{ width, flex: 1 }}>
          <AssignmentsTab />
        </View>
        <View style={{ width, flex: 1 }}>
          <GradesTab />
        </View>
      </Animated.ScrollView>
    </YStack>
  );
};

export default CourseDetailScreen;
