import React from "react";
import {MaterialIcons} from "@expo/vector-icons";
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
      icon={<MaterialIcons name="article" size={23} color="#666"/>}
    />
  );
}
