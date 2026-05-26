import React from "react";
import {Text as RNText, TouchableOpacity, View} from "react-native";
import {Image, XStack, YStack} from "./ui";

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
          <RNText style={{fontSize: 16, fontWeight: "bold", color: "#333", marginBottom: 4}} numberOfLines={1}>
            {title}
          </RNText>
          <RNText style={{fontSize: 13, color: "#666"}} numberOfLines={1}>
            {subTitle}
          </RNText>
        </YStack>
      </XStack>
    </XStack>
  </TouchableOpacity>
);
