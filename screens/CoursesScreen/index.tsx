import React from 'react';
import {ScrollView, TextInput} from 'react-native';
import {XStack, YStack} from '@tamagui/stacks';
import {MaterialIcons} from '@expo/vector-icons';
import {Text} from 'tamagui';
import {FilterButton} from "./FilterButton";
import {CourseCard} from "./CourseCard";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../components/Navigation";

const CoursesListScreen = ({navigation}: NativeStackScreenProps<RootStackParamList, "HomeTabs">) => {
  const onSelectCourse = (id: string) => {
    navigation.navigate("CourseDetail");
  }
  return (
    <YStack flex={1} backgroundColor="#ffffff" minHeight={"100%"}>
      {/* Header */}
      <XStack
        alignItems="center"
        justifyContent="center"
        paddingHorizontal="$4"
        paddingVertical="$5"
        paddingBottom="$6"
        backgroundColor="#f8f9fa"
      >
        <Text fontSize={24} fontWeight="800" color="#333">
          Courses
        </Text>
        {/*<TouchableOpacity>*/}
        {/*  <MaterialIcons name="menu" size={24} color="#333" />*/}
        {/*</TouchableOpacity>*/}
      </XStack>

      {/* Search Bar */}
      <XStack
        alignItems="center"
        marginHorizontal="$4"
        marginBottom="$4"
        paddingHorizontal="$4"
        paddingVertical="$1.5"
        backgroundColor="#2222"
        borderRadius="$4"
      >
        <MaterialIcons name="search" size={26} color="#999" style={{ marginRight: 12 }} />
        <TextInput
          placeholder="Find a course"
          placeholderTextColor="#999"
          style={{
            flex: 1,
            fontSize: 18,
            color: '#666'
          }}
        />
      </XStack>

      {/* Filter Buttons */}
      <XStack paddingHorizontal={16} marginTop={"$3"} marginBottom={"$4"}>
        <FilterButton title="All" isActive={true} />
        <FilterButton title="Active" />
        <FilterButton title="Completed" />
      </XStack>

      {/* Course List */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <YStack flex={1}>
          <CourseCard
            title="CS101"
            subTitle="Intro to Programming"
            imageUrl={"https://images.unsplash.com/photo-1507413245164-6160d8298b31"}
            imageBackgroundColor="#1e3a8a"
            onPress={() => onSelectCourse("1")}
          />

          <CourseCard
            title="MA101"
            subTitle="Calculus I"
            imageUrl={"https://images.unsplash.com/photo-1507413245164-6160d8298b31"}
            imageBackgroundColor="#f3f4f6"
            onPress={() => onSelectCourse("2")}
          />

          <CourseCard
            title="HI101"
            subTitle="World History"
            imageUrl={"https://images.unsplash.com/photo-1507413245164-6160d8298b31"}
            imageBackgroundColor="#92400e"
            onPress={() => onSelectCourse("3")}
          />

          <CourseCard
            title="EN101"
            subTitle="English Composition"
            imageUrl={"https://images.unsplash.com/photo-1507413245164-6160d8298b31"}
            imageBackgroundColor="#059669"
            onPress={() => onSelectCourse("4")}
          />
        </YStack>
      </ScrollView>
    </YStack>
  );
};

export default CoursesListScreen;
