import React from "react";
import {TouchableOpacity, View} from "react-native";
import {XStack, YStack} from "@tamagui/stacks";
import {Image, Text} from "tamagui";

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
      alignItems="center"
      paddingHorizontal="$3"
      paddingVertical="$3"
      backgroundColor="white"
      marginBottom="$3"
      borderRadius="$4"
      gap={"$3.5"}
    >
      <Image src={imageUrl} width={63} height={63} backgroundColor={imageBackgroundColor} borderRadius={8} />
      <YStack flex={1}>
        <Text fontSize={20} fontWeight={"bold"} color={"#333"} marginBottom={"$1"}>
          {title}
        </Text>
        <Text fontSize={16} color={"#666"}>
          {subTitle}
        </Text>
      </YStack>
    </XStack>
  </TouchableOpacity>
);
