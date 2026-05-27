import React from "react";
import {MaterialIcons} from "@expo/vector-icons";
import Item from "../../../components/Item";

type DiscussionItemProps = {
  title: string;
  onPress: () => void;
};

export default function DiscussionItem({title, onPress}: DiscussionItemProps) {
  return (
    <Item
      title={title}
      onPress={onPress}
      icon={<MaterialIcons name="forum" size={23} color="#666"/>}
    />
  );
}
