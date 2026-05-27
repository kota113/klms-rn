import React from "react";
import {Text, XStack} from "./ui";

type TabHeaderProps = {
  title: string;
};

export default function TabHeader({title}: TabHeaderProps) {
  return (
    <XStack
      alignItems="flex-end"
      justifyContent="flex-start"
      paddingHorizontal="$4"
      paddingVertical="$5"
      paddingBottom="$7"
      backgroundColor="white"
    >
      <Text fontSize={22} fontWeight="800" color="#333">
        {title}
      </Text>
    </XStack>
  );
}
