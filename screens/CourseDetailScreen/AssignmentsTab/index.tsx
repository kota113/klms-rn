import {H2, H5, H6, Text} from "tamagui";
import {YStack} from "@tamagui/stacks";
import {ScrollView} from "react-native";
import AssignmentItem from "./AssignmentItem";

export default function AssignmentsTab() {

  return (
    <ScrollView>
      <YStack backgroundColor={"white"} minHeight={"100%"} paddingHorizontal={"$4.5"} paddingVertical={"$4"}>
        <YStack marginTop={"$2"}>
          <Text fontSize={22} marginTop={"$2"} marginBottom={"$3"} fontWeight={"bold"}>これからの課題</Text>
          <AssignmentItem id={"1"} title={"課題1"} dueDate={"2021/01/01"} onPress={() => {}}/>
          <AssignmentItem id={"1"} title={"課題1"} dueDate={"2021/01/01"} onPress={() => {}}/>
          <AssignmentItem id={"1"} title={"課題1"} dueDate={"2021/01/01"} onPress={() => {}}/>
        </YStack>
        <YStack marginTop={"$6"}>
          <Text fontSize={22} marginTop={"$2"} marginBottom={"$3"} fontWeight={"bold"}>過ぎた課題</Text>
          <AssignmentItem id={"1"} title={"課題1"} dueDate={"2021/01/01"} onPress={() => {}}/>
          <AssignmentItem id={"1"} title={"課題1"} dueDate={"2021/01/01"} onPress={() => {}}/>
          <AssignmentItem id={"1"} title={"課題1"} dueDate={"2021/01/01"} onPress={() => {}}/>
        </YStack>
      </YStack>
    </ScrollView>
  )
}
