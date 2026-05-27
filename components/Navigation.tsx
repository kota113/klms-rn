import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import * as React from "react";
import {useEffect} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator, NativeStackScreenProps} from "@react-navigation/native-stack";
import BottomBar from "./BottomBar";
import DashboardScreen from "../screens/DashboardScreen";
import CoursesScreen from "../screens/CoursesScreen";
import TodoScreen from "../screens/TodoScreen";
import CalendarScreen from "../screens/CalendarScreen";
import MessagesScreen from "../screens/MessagesScreen";
import CourseDetailScreen from "../screens/CourseDetailScreen";
import AssignmentDetailScreen from "../screens/AssignmentDetailScreen";
import TokenInputScreen from "../screens/TokenInputScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import AuthenticatedWebViewScreen from "../screens/AuthenticatedWebViewScreen";
import ConversationDetailScreen from "../screens/ConversationDetailScreen";
import AnnouncementDetailScreen from "../screens/AnnouncementDetailScreen";
import ModulePageScreen from "../screens/ModulePageScreen";
import {apiClient} from "../services/api";

export type RootTabParamList = {
  Home: undefined;
  Dashboard: undefined;
  Todo: undefined;
  Calendar: undefined;
  Messages: undefined;
};
export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  HomeTabs: undefined;
  Courses: undefined;
  CourseDetail: { courseId: number; initialTab?: 'home' | 'assignments' | 'announcements' | 'grades' };
  AssignmentDetail: { courseId: number; assignmentId: number; title?: string };
  ModulePage: { courseId: number; pageUrl: string; title?: string };
  AuthenticatedWebView: { url: string; title?: string; downloadUrl?: string; showFileActions?: boolean };
  ConversationDetail: { conversationId: string; title?: string };
  AnnouncementDetail: { courseId: number; announcementId: number; title?: string };
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeTabs = ({navigation}: NativeStackScreenProps<RootStackParamList>) => {
  useEffect(() => {
    const checkSession = async () => {
      const sessionExists = await apiClient.hasSession();
      if (!sessionExists) {
        navigation.replace('Login');
        return;
      }
    };
    checkSession().then();

    // Navigate to Login when the session is cleared (e.g. expired 401).
    const sessionChangeListener = (exists: boolean) => {
      if (!exists) {
        navigation.replace('Login');
      }
    };
    apiClient.addSessionChangeListener(sessionChangeListener);
    return () => {
      apiClient.removeSessionChangeListener(sessionChangeListener);
    };
  }, []);
  return (
    <Tab.Navigator tabBar={(props: any) => <BottomBar {...props} />}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{headerShown: false, title: "ダッシュボード"}}/>
      <Tab.Screen name="Todo" component={TodoScreen} options={{headerShown: false, title: "ToDo"}}/>
      <Tab.Screen name="Calendar" component={CalendarScreen} options={{headerShown: false, title: "カレンダー"}}/>
      <Tab.Screen name="Messages" component={MessagesScreen} options={{headerShown: false, title: "メッセージ"}}/>
    </Tab.Navigator>
  )
}

type NavigationProps = {
  initialRouteName: keyof RootStackParamList;
};

export default function Navigation({initialRouteName}: NavigationProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={initialRouteName}>
          <Stack.Screen name="Onboarding" component={OnboardingScreen}/>
          <Stack.Screen name="Login" component={TokenInputScreen}/>
          <Stack.Screen name="HomeTabs" component={HomeTabs}/>
          <Stack.Screen name="Courses" component={CoursesScreen}/>
          <Stack.Screen name="CourseDetail" component={CourseDetailScreen}/>
          <Stack.Screen name="AssignmentDetail" component={AssignmentDetailScreen}/>
          <Stack.Screen name="ModulePage" component={ModulePageScreen}/>
          <Stack.Screen name="AuthenticatedWebView" component={AuthenticatedWebViewScreen}/>
          <Stack.Screen name="ConversationDetail" component={ConversationDetailScreen}/>
          <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetailScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};
