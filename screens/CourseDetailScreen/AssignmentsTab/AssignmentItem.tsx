import {MaterialCommunityIcons} from "@expo/vector-icons";
import Item from "../../../components/Item";

export default function AssignmentItem({id, title, dueDate, courseName, onPress}: {
  id: string,
  title: string,
  dueDate: string,
  courseName?: string,
  onPress: () => void
}) {
  return (
    <Item
      title={title}
      subText={`期限: ${dueDate} ${courseName ? `・${courseName}` : ""}`}
      onPress={onPress}
      icon={<MaterialCommunityIcons name={"file-outline"} size={27} color="#333"/>}
    />
  )
}
