import {TouchableOpacity, View} from "react-native";
import {XStack, Text} from "tamagui";
import {YStack} from "@tamagui/stacks";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Item from "../../../components/Item";

export default function AssignmentItem({id, title, dueDate, onPress}: { id: string, title: string, dueDate: string, onPress: () => void}) {
  return (
    <Item title={title} subText={`期限: ${dueDate}`} onPress={onPress} icon={<MaterialCommunityIcons name={"file-outline"} size={27} color="#333" />}/>
  )
}
