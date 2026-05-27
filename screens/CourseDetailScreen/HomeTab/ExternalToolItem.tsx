import React from "react";
import {MaterialIcons} from "@expo/vector-icons";
import Item from "../../../components/Item";

type ExternalToolItemProps = {
  title: string;
  onPress: () => void;
};

export default function ExternalToolItem({title, onPress}: ExternalToolItemProps) {
  return (
    <Item
      title={title}
      onPress={onPress}
      icon={<MaterialIcons name="extension" size={23} color="#666"/>}
    />
  );
}
