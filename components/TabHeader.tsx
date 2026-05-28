import React from "react";
import {Text, XStack} from "./ui";

type TabHeaderProps = {
  title: string;
  rightElement?: React.ReactNode;
};

export default function TabHeader({title, rightElement}: TabHeaderProps) {
  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal="$4"
      paddingVertical="$5"
      paddingBottom="$7"
      backgroundColor="white"
    >
      <Text fontSize={22} fontWeight="800" color="#333">
        {title}
      </Text>
      {rightElement}
    </XStack>
  );
}
