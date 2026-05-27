import {MaterialCommunityIcons} from "@expo/vector-icons";
import {StyleProp, TextStyle} from "react-native";
import Item from "../../../components/Item";

export default function AssignmentItem({title, dueDate, courseName, onPress, titleStyle}: {
  title: string,
  dueDate: string,
  courseName?: string,
  onPress: () => void,
  titleStyle?: StyleProp<TextStyle>,
}) {
  return (
    <Item
      title={title}
      subText={`期限: ${dueDate} ${courseName ? `・${courseName}` : ""}`}
      onPress={onPress}
      icon={<MaterialCommunityIcons name={"clipboard-text"} size={23} color="#666"/>}
      titleStyle={titleStyle}
    />
  )
}
