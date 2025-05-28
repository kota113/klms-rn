import {XStack, Text} from "tamagui";
import React from "react";
import Animated, {useAnimatedStyle, withTiming} from "react-native-reanimated";
import {StyleSheet, Pressable} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function BottomBar({state, descriptors, navigation}: any) {
  return (
    <XStack gap={"$2"} justifyContent="space-around" backgroundColor="white" paddingVertical={"$3"} paddingHorizontal={"$3"}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label = options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const animatedStyle = useAnimatedStyle(() => {
          return {
            transform: [
              {
                scale: withTiming(isFocused ? 1.1 : 1, {
                  duration: 200,
                }),
              },
            ],
            color: withTiming(
              isFocused ? 'blue' : 'black',
              {duration: 200}
            ),
          };
        });

        let icon;
        switch (route.name) {
          case 'Home':
          case 'Dashboard':
            icon = <MaterialIcons name="home" size={24} color={isFocused ? "black" : "gray"} />;
            break;
          case 'Courses':
            icon = <MaterialIcons name="library-books" size={24} color={isFocused ? "black" : "gray"} />;
            break;
          case 'Calendar':
            icon = <MaterialIcons name="calendar-today" size={24} color={isFocused ? "black" : "gray"} />;
            break;
          case 'Notifications':
            icon = <MaterialIcons name="notifications" size={24} color={isFocused ? "black" : "gray"} />;
            break;
          default:
            icon = <MaterialIcons name="home" size={24} color={isFocused ? "black" : "gray"} />;
        }

        return (
          <AnimatedPressable
            key={route.key}
            style={[styles.tabItem, animatedStyle]}
            onPress={onPress}
          >
            {icon}
            <Text fontSize={10} color={isFocused ? "black": "gray"} fontWeight={"bold"} marginTop={"$1"}>
              {label}
            </Text>
          </AnimatedPressable>
        );
      })}
    </XStack>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});
