import React from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Item from "../../../components/Item";

type PageItemProps = {
  title: string;
  onPress: () => void;
};

export default function PageItem({title, onPress}: PageItemProps) {
  return (
    <Item
      title={title}
      onPress={onPress}
      icon={<MaterialCommunityIcons name="text-box-outline" size={23} color="#666"/>}
    />
  );
}
