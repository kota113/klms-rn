import React from "react";
import {TouchableOpacity, View} from "react-native";
import {Image, Text, XStack, YStack} from "./ui";

interface CourseCardProps {
  title: string;
  subTitle: string;
  imageUrl: string;
  imageBackgroundColor: string;
  onPress?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
                                                        title,
                                                        subTitle,
                                                        imageUrl,
                                                        imageBackgroundColor,
                                                        onPress
                                                      }) => (
  <TouchableOpacity onPress={onPress}>
    <XStack
      alignItems="stretch"
      backgroundColor="white"
      marginBottom="$3"
    >
      {/* Theme color bar on the left */}
      <View style={{width: 5, backgroundColor: imageBackgroundColor}}/>
      <XStack flex={1} alignItems="center" paddingHorizontal="$3" paddingVertical="$3" gap={"$3.5"}>
        <YStack flex={1}>
          <Text fontSize={18} fontWeight={"bold"} color={"#333"} marginBottom={"$1"}>
            {title}
          </Text>
          <Text fontSize={14} color={"#666"}>
            {subTitle}
          </Text>
        </YStack>
      </XStack>
    </XStack>
  </TouchableOpacity>
);
