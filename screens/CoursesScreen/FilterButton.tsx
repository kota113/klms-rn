import React from "react";
import {TouchableOpacity} from "react-native";
import {Text, XStack} from "../../components/ui";
import {MaterialIcons} from "@expo/vector-icons";

interface FilterButtonProps {
  title: string;
  selected?: boolean;
  onPress?: () => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({title, selected = false, onPress}) => (
  <TouchableOpacity activeOpacity={0.75} onPress={onPress}>
    <XStack
      alignItems="center"
      paddingHorizontal="$3"
      paddingVertical="$1.5"
      backgroundColor={selected ? '#d6d6d6' : '#f5f5f5'}
      borderColor={selected ? '#d6d6d6' : '#f0f0f0'}
      borderWidth={1}
      borderRadius="$3"
      gap="$1.5"
      marginRight="$3"
    >
      {selected ? <MaterialIcons name="check" size={18} color="#333"/> : null}
      <Text
        fontWeight={selected ? "700" : "600"}
        fontSize={13}
        color={selected ? '#333' : '#666'}
      >
        {title}
      </Text>
    </XStack>
  </TouchableOpacity>
);
