import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import * as React from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import BottomBar from "./BottomBar";
import DashboardScreen from "../screens/DashboardScreen";
import CoursesScreen from "../screens/CoursesScreen";
import CalendarScreen from "../screens/CalendarScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import CourseDetailScreen from "../screens/CourseDetailScreen";

export type RootTabParamList = {
  Home: undefined;
  Dashboard: undefined;
  Courses: undefined;
  Calendar: undefined;
  Notifications: undefined;
};
export type RootStackParamList = {
  Login: undefined;
  HomeTabs: undefined;
  CourseDetail: { courseId: number };
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeTabs = () => {
  return (
    <Tab.Navigator tabBar={(props: any) => <BottomBar {...props} />}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{headerShown: false, title: "ダッシュボード"}}/>
      <Tab.Screen name="Courses" component={CoursesScreen} options={{headerShown: false, title: "コース"}}/>
      <Tab.Screen name="Calendar" component={CalendarScreen} options={{headerShown: false, title: "カレンダー"}}/>
      <Tab.Screen name="Notifications" component={NotificationsScreen} options={{headerShown: false, title: "通知"}}/>
    </Tab.Navigator>
  )
}

export default function Navigation() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="HomeTabs" component={HomeTabs}/>
          <Stack.Screen name="CourseDetail" component={CourseDetailScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};
