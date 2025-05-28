import {XStack, YStack} from "@tamagui/stacks";
import {Image, Text} from "tamagui";
import React from "react";
import {FlatList, ScrollView, TouchableOpacity} from "react-native";
import AnnouncementItem from "./AnnouncementItem";
import AssignmentItem from "../CourseDetailScreen/AssignmentsTab/AssignmentItem";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../components/Navigation";

interface CourseItem {
  id: string;
  title: string;
  imageUrl: string;
  imageBackgroundColor: string;
}

export default function DashboardScreen({navigation}: NativeStackScreenProps<RootStackParamList, 'HomeTabs'>) {
  return (
    <YStack flex={1} backgroundColor="#ffffff" minHeight={"100%"}>
      <XStack
        alignItems="center"
        justifyContent="center"
        paddingHorizontal="$4"
        paddingVertical="$5"
        paddingBottom="$6"
        backgroundColor="white"
      >
        <Text fontSize={24} fontWeight="800" color="#333">
          Dashboard
        </Text>
      </XStack>
      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
        <YStack marginTop={"$2"}>
          <Text paddingHorizontal={"$4.5"} fontSize={22} fontWeight={"bold"} marginBottom={"$3"}>コース</Text>
          <FlatList
            style={{marginTop: 15}}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{paddingHorizontal: 20}}
            data={[{
              id: "1",
              title: "プログラミング入門",
              imageUrl: "https://picsum.photos/id/1001/200/300",
              imageBackgroundColor: "#f00",
            },
              {
                id: "2",
                title: "プログラミング入門",
                imageUrl: "https://picsum.photos/id/1001/200/300",
                imageBackgroundColor: "#f00",
              },
              {
                id: "3",
                title: "プログラミング入門",
                imageUrl: "https://picsum.photos/id/1001/200/300",
                imageBackgroundColor: "#f00",
              }]}
            renderItem={() => (
              <TouchableOpacity onPress={() => {
                navigation.navigate("CourseDetail")
              }}>
                <YStack marginRight={"$3"}>
                  <Image height={175} width={175} borderRadius={13}
                         source={{uri: "https://picsum.photos/id/1001/200/300"}}/>
                  <Text fontSize={16} marginTop={"$4"} fontWeight={"bold"} numberOfLines={1}>プログラミング入門</Text>
                </YStack>
              </TouchableOpacity>
            )}
          />
        </YStack>
        <YStack marginTop={"$5"} paddingHorizontal={"$4.5"}>
          <Text fontSize={22} fontWeight={"bold"} marginVertical={"$3"}>最近のアナウンス</Text>
          <AnnouncementItem id={"1"} title={"課題を公開しました"} courseName={"経営分析"}/>
          <AnnouncementItem id={"1"} title={"課題を公開しました"} courseName={"経営分析"}/>
        </YStack>

        <YStack marginTop={"$5"} paddingHorizontal={"$4.5"}>
          <Text fontSize={22} fontWeight={"bold"} marginVertical={"$3"}>これからの課題</Text>
          <AssignmentItem id={"1"} title={"今週のビジネスニュース(提出期限 5/12 13:00)"} courseName={"経営分析"}
                          dueDate={"2025/04/21"} onPress={() => {
          }}/>
          <AssignmentItem id={"2"} title={"今週のビジネスニュース(提出期限 5/12 13:00)"} courseName={"経営分析"}
                          dueDate={"2025/04/21"} onPress={() => {
          }}/>
        </YStack>
      </ScrollView>
    </YStack>
  )
}
