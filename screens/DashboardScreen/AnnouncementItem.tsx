import type React from "react";
import Item from "../../components/Item";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default function AnnouncementItem({title, courseName, onPress, rightElement}: {
  title: string,
  courseName?: string,
  onPress: () => void,
  rightElement?: React.ReactNode,
}) {
  return (
    <Item
      title={title}
      subText={courseName}
      onPress={onPress}
      rightElement={rightElement}
      icon={<MaterialCommunityIcons name={"bullhorn-outline"} size={23} color="#666"/>}
    />
  )
}
