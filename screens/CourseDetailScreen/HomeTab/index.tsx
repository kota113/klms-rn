import {YStack} from "@tamagui/stacks";
import {ModuleSection} from "./ModuleSection";
import {FileItem} from "./FileItem";
import {MaterialIcons} from "@expo/vector-icons";
import {ScrollView} from "react-native";
import React from "react";
import {Text} from "tamagui";
import AssignmentItem from "../AssignmentsTab/AssignmentItem";

export default function ModuleTab() {
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <YStack backgroundColor={"white"} minHeight={"100%"} paddingHorizontal={"$4.5"} paddingVertical={"$4"}>
        <YStack marginTop={"$2"}>
          <Text fontSize={22} marginTop={"$2"} marginBottom={"$3"} fontWeight={"bold"}>1. イントロダクション</Text>
          <FileItem title={"フジテレビ.pptx"} onPress={() => {}}/>
          <FileItem title={"自己紹介と進め方_.pptx"} onPress={() => {}}/>
          <AssignmentItem id={"1"} title={"任意事後課題（フジテレビ）"} dueDate={"2025/4/21"} onPress={() => {}}/>
        </YStack>
        <YStack marginTop={"$6"}>
          <Text fontSize={22} marginTop={"$2"} marginBottom={"$3"} fontWeight={"bold"}>2. 損益計算書の大枠</Text>
          <AssignmentItem id={"1"} title={"4/21用事前課題（提出期限4/20 22時）"} dueDate={"2025/04/20"} onPress={() => {}}/>
          <AssignmentItem id={"1"} title={"今週のビジネスニュース（4/21、13時までに提出）"} dueDate={"2025/04/21"} onPress={() => {}}/>
          <FileItem title={'SHEIN v.s. ZARA Case study.pdf'} onPress={() => {}}/>
        </YStack>
      </YStack>
    </ScrollView>
  )
}
