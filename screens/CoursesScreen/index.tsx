import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import {XStack, YStack} from '@tamagui/stacks';
import {MaterialIcons} from '@expo/vector-icons';
import {Text, View} from 'tamagui';
import {FilterButton} from "./FilterButton";
import {CourseCard} from "../../components/CourseCard";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../components/Navigation";
import {coursesService, DashboardCard, UserColors, usersService} from "../../services/api";

const CoursesListScreen = ({navigation}: NativeStackScreenProps<RootStackParamList>) => {
  const [courses, setCourses] = useState<DashboardCard[]>([]);
  const [courseColors, setCourseColors] = useState<UserColors>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch courses
        const coursesData = await coursesService.getDashboardCards();
        setCourses(coursesData);

        // Fetch user colors
        const colorsData = await usersService.getUserColors();
        setCourseColors(colorsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSelectCourse = (id: string) => {
    navigation.navigate("CourseDetail", {courseId: Number(id)});
  }

  // Get color for a course from user colors or return a default color
  const getCourseColor = (courseId: number): string => {
    const assetString = usersService.formatCourseAssetString(courseId);
    return courseColors[assetString] || '#f0f0f0'; // Default light gray if no color is set
  }

  // Filter courses based on search term
  const filteredCourses = useMemo(() => {
    if (!searchTerm.trim()) {
      return courses;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    return courses.filter(course =>
      course.courseCode.toLowerCase().includes(lowerCaseSearchTerm) ||
      course.shortName.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [courses, searchTerm]);
  return (
    <YStack flex={1} backgroundColor="#ffffff" minHeight={"100%"}>
      {/* Header */}
      <XStack
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal="$5"
        paddingVertical="$5"
        paddingBottom="$6"
        backgroundColor="white"
      >
        <View width={24}/>
        <Text fontSize={24} fontWeight="800" color="#333">
          コース
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("HiddenCourses")}>
          <MaterialIcons name="edit" size={24} color="#333"/>
        </TouchableOpacity>
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
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </XStack>

      {/* Filter Buttons */}
      <XStack paddingHorizontal={16} marginTop={"$3"} marginBottom={"$4"}>
        <FilterButton title="All" isActive={true} />
        <FilterButton title="Active" />
        <FilterButton title="Completed" />
      </XStack>

      {/* Course List */}
      {loading ? (
        <YStack flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" color="black"/>
          <Text marginTop="$4">読込中...</Text>
        </YStack>
      ) : (
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
        >
          <YStack flex={1}>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard
                  key={course.id.toString()}
                  title={course.courseCode}
                  subTitle={course.enrollmentType === "StudentEnrollment" ? "学生" : "TA"}
                  imageUrl={course.image_download_url || ""}
                  imageBackgroundColor={course.image_download_url ? "#f0f0f0" : getCourseColor(course.id)}
                  onPress={() => onSelectCourse(course.id.toString())}
                />
              ))
            ) : (
              <Text textAlign="center" marginTop="$6">
                {searchTerm.trim() ? "No matching courses found" : "No courses found"}
              </Text>
            )}
          </YStack>
        </ScrollView>
      )}
    </YStack>
  );
};

export default CoursesListScreen;
