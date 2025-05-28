import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {XStack} from "@tamagui/stacks";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import Item from "../../../components/Item";


interface ModuleItemProps {
  title: string;
  onPress: () => void;
}

export const FileItem: React.FC<ModuleItemProps> = ({title, onPress}) => (
  <Item
    title={title}
    onPress={onPress}
    icon={<MaterialIcons name={"attach-file"} size={27} color={"666"}/>}
  />
);
