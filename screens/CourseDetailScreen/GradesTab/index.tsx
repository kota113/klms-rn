import {YStack} from "@tamagui/stacks";
import {Text} from "tamagui";
import {FileItem} from "../ModuleTab/FileItem";
import AssignmentItem from "../AssignmentsTab/AssignmentItem";
import {ScrollView} from "react-native";
import React from "react";
import GradeItem from "./GradeItem";

export default function GradesTab() {
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <YStack backgroundColor={"white"} minHeight={"100%"} paddingHorizontal={"$4.5"} paddingVertical={"$4"}>
        <YStack marginTop={"$2"}>
          <Text fontSize={25} marginVertical={"$2"} fontWeight={"bold"}>Overall</Text>
          <Text fontSize={35} fontWeight={"bold"} marginTop={"$3"}>85%</Text>
        </YStack>
        <YStack marginTop={"$6"}>
          <Text fontSize={22} marginTop={"$2"} marginBottom={"$3.5"} fontWeight={"bold"}>課題</Text>
          <GradeItem title={"課題1"} fullScore={10} achievedScore={5} dueDate={"2025/03/12"} />
          <GradeItem title={"課題1"} fullScore={10} achievedScore={5} dueDate={"2025/03/12"} />
          <GradeItem title={"課題1"} fullScore={10} achievedScore={5} dueDate={"2025/03/12"} />
        </YStack>
      </YStack>
    </ScrollView>
  )
}
