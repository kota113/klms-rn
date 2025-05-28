import React from "react";
import {TouchableOpacity} from "react-native";
import {XStack} from "@tamagui/stacks";
import {Text} from "tamagui";
import {MaterialIcons} from "@expo/vector-icons";

interface FilterButtonProps {
  title: string;
  isActive?: boolean;
  onPress?: () => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({title, isActive = false, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <XStack
      alignItems="center"
      paddingLeft="$4"
      paddingRight="$3"
      paddingVertical="$2"
      backgroundColor={isActive ? '#d6d6d6' : '#f5f5f5'}
      borderRadius="$3"
      marginRight="$3"
    >
      <Text
        fontWeight={"bold"}
        fontSize={16}
        color={isActive ? '#000000' : '#666'}
        marginRight={8}
      >
        {title}
      </Text>
      <MaterialIcons name="keyboard-arrow-down" size={19} color={isActive ? '#000000' : '#666'}/>
    </XStack>
  </TouchableOpacity>
);
