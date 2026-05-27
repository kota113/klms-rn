import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, TextInput, TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {Text, XStack, YStack} from "../../components/ui";
import {FilterButton} from "./FilterButton";
import {CourseCard} from "../../components/CourseCard";
import {Skeleton, SkeletonText} from "../../components/skeleton";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../components/Navigation";
import {Course, DashboardCard, coursesService} from "../../services/api";

type CourseFilter = 'all' | 'active' | 'completed';

const CoursesListScreen = ({navigation}: NativeStackScreenProps<RootStackParamList>) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [dashboardCards, setDashboardCards] = useState<DashboardCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<CourseFilter>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesData, cardsData] = await Promise.all([
          coursesService.getCourses().catch((error) => {
            console.error('Error fetching courses:', error.response?.data ?? error);
            return [] as Course[];
          }),
          coursesService.getDashboardCards().catch((error) => {
            console.error('Error fetching dashboard cards:', error.response?.data ?? error);
            return [] as DashboardCard[];
          }),
        ]);
        setCourses(coursesData);
        setDashboardCards(cardsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setCourses([]);
        setDashboardCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSelectCourse = (id: string) => {
    navigation.navigate("CourseDetail", {courseId: Number(id)});
  }

  const getCourseColor = (courseId: number): string => {
    const palette = ['#f4e4d8', '#e6eef8', '#e7f4ea', '#f6e8f2', '#f2efe3', '#e5f1ef'];
    return palette[Math.abs(courseId) % palette.length];
  }

  const dashboardCardIds = useMemo(
    () => new Set(dashboardCards.map(card => card.id)),
    [dashboardCards]
  );

  const filteredCourses = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    return courses.filter(course => {
      if (course.access_restricted_by_date || !course.name || !course.course_code) {
        return false;
      }
      const matchesSearch = !lowerCaseSearchTerm ||
        course.course_code.toLowerCase().includes(lowerCaseSearchTerm) ||
        course.name.toLowerCase().includes(lowerCaseSearchTerm);
      const isInDashboard = dashboardCardIds.has(course.id);
      const matchesFilter =
        selectedFilter === 'all' ||
        (selectedFilter === 'active' ? isInDashboard : !isInDashboard);

      return  matchesSearch && matchesFilter;
    });
  }, [courses, dashboardCardIds, searchTerm, selectedFilter]);

  return (
    <YStack flex={1} backgroundColor="#ffffff" minHeight={"100%"}>

      <YStack backgroundColor="white" paddingHorizontal="$4" paddingBottom="$5">
        <XStack alignItems="center" height={34} marginTop={"$3"}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#333"/>
          </TouchableOpacity>
        </XStack>
        <Text fontSize={22} fontWeight="800" color="#333" marginTop="$2" numberOfLines={1}>
          すべてのコース
        </Text>
      </YStack>

      {/*<XStack*/}
      {/*  alignItems="center"*/}
      {/*  backgroundColor="white"*/}
      {/*  paddingHorizontal="$4"*/}
      {/*  paddingVertical="$5"*/}
      {/*  paddingBottom="$6"*/}
      {/*  gap="$2"*/}
      {/*>*/}
      {/*  <TouchableOpacity onPress={() => navigation.goBack()}>*/}
      {/*    <MaterialIcons name="chevron-left" size={24} color="#333"/>*/}
      {/*  </TouchableOpacity>*/}
      {/*  <Text fontSize={22} fontWeight="800" color="#333" numberOfLines={1} style={{flex: 1}}>*/}
      {/*    すべてのコース*/}
      {/*  </Text>*/}
      {/*</XStack>*/}

      {/* Search Bar */}
      <XStack
        alignItems="center"
        marginHorizontal="$4"
        marginBottom="$4"
        paddingHorizontal="$4"
        backgroundColor="#2222"
        borderRadius="$5"
      >
        <MaterialIcons name="search" size={24} color="#999" style={{marginRight: 6}}/>
        <TextInput
          placeholder="コースを検索"
          placeholderTextColor="#999"
          style={{
            flex: 1,
            fontSize: 17,
            color: '#666'
          }}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </XStack>

      {/* Filter Buttons */}
      <XStack paddingHorizontal={16} marginBottom={"$5"}>
        <FilterButton title="すべて" selected={selectedFilter === 'all'} onPress={() => setSelectedFilter('all')} />
        <FilterButton title="受講中" selected={selectedFilter === 'active'} onPress={() => setSelectedFilter('active')} />
        <FilterButton title="過去のコース" selected={selectedFilter === 'completed'} onPress={() => setSelectedFilter('completed')} />
      </XStack>

      {/* Course List */}
      {loading ? (
        <YStack paddingHorizontal="$4" paddingBottom="$5">
          {Array.from({length: 6}).map((_, index) => (
            <XStack
              key={index}
              alignItems="stretch"
              backgroundColor="white"
              marginBottom="$3"
            >
              <Skeleton width={5} height={58} style={{borderRadius: 0}}/>
              <XStack flex={1} alignItems="center" paddingHorizontal="$3" paddingVertical="$3" gap="$3.5">
                <YStack flex={1}>
                  <SkeletonText width="64%" height={16} style={{marginBottom: 6}}/>
                  <SkeletonText width="78%" height={13}/>
                </YStack>
              </XStack>
            </XStack>
          ))}
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
                  title={course.course_code || course.name}
                  subTitle={course.name}
                  imageUrl={course.image_download_url || ""}
                  imageBackgroundColor={course.image_download_url ? "#f0f0f0" : getCourseColor(course.id)}
                  onPress={() => onSelectCourse(course.id.toString())}
                />
              ))
            ) : (
              <Text textAlign="center" marginTop="$6">
                {searchTerm.trim() ? "条件に一致するコースはありません" : "コースはありません"}
              </Text>
            )}
          </YStack>
        </ScrollView>
      )}
    </YStack>
  );
};

export default CoursesListScreen;
