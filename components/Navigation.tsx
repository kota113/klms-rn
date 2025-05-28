import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import * as React from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import BottomBar from "./BottomBar";
import HomeScreen from "../screens/HomeScreen";

export type RootTabParamList = {
  Home: undefined;
};
export type RootStackParamList = {
  Login: undefined;
  HomeTabs: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeTabs = () => {
  return (
    <Tab.Navigator tabBar={(props: any) => <BottomBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false, title: "ホーム"}}/>
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
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};
