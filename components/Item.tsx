import React from "react";
import {StyleProp, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {Text, XStack, YStack} from "./ui";

type ItemProps = {
  title: string;
  subText?: React.ReactNode;
  subTextColor?: string;
  onPress?: () => void;
  icon: React.ReactNode;
  iconContainerStyle?: StyleProp<ViewStyle>;
  barColor?: string;
  rightElement?: React.ReactNode;
  titleRightElement?: React.ReactNode;
  titleStyle?: StyleProp<TextStyle>;
  titleSelectable?: boolean;
};

export default function Item({
  title,
  subText,
                               subTextColor = '#666',
  onPress,
  icon,
  iconContainerStyle,
                               barColor = '#d8d8d8',
  rightElement,
  titleRightElement,
  titleStyle,
  titleSelectable,
}: ItemProps) {
  const content = (
    <XStack
      alignItems="center"
      paddingVertical="$2"
      paddingRight="$4.5"
      backgroundColor="white"
    >
      {icon === null ? (
        <View style={{
          width: 5,
          alignSelf: 'stretch',
          backgroundColor: barColor,
          opacity: 1,
          borderRadius: 2,
          marginRight: 12
        }}/>
      ) : (
        <View
          style={[
            {
              width: 48,
              height: 48,
              backgroundColor: '#f5f5f5',
              borderRadius: 8,
              marginRight: 14,
              justifyContent: 'center',
              alignItems: 'center'
            },
            iconContainerStyle,
          ]}
        >
          {icon}
        </View>
      )}
      <YStack flex={1} justifyContent={"space-between"} gap={"$0.5"}>
        {subText ? (<>
          <XStack alignItems="center" gap="$0.5">
            <Text fontSize={15} color="#333" numberOfLines={1} selectable={titleSelectable} style={[{flexShrink: 1}, titleStyle]}>
              {title}
            </Text>
            {titleRightElement}
          </XStack>
          <Text fontSize={13} color={subTextColor} style={{flexWrap: 'wrap'}}>
            {subText}
          </Text>
        </>) : (
          <XStack alignItems="flex-end" gap="$1.5">
            <Text fontSize={15} color="#333" selectable={titleSelectable} style={[{flexShrink: 1}, titleStyle]}>{title}</Text>
            {titleRightElement}
          </XStack>
        )}
      </YStack>
      {rightElement}
    </XStack>
  );

  if (!onPress) {
    return content;
  }

  return (
    <TouchableOpacity activeOpacity={0.75} onPress={onPress}>
      {content}
    </TouchableOpacity>
  );
}
