import {XStack, YStack} from "@tamagui/stacks";
import {Alert, TouchableOpacity} from "react-native";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {Image, Text, View} from "tamagui";
import React from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../components/Navigation";

function HiddenCourseCard({title, subTitle, imageUrl, imageBackgroundColor, onPress}: {
  title: string;
  subTitle: string;
  imageUrl: string;
  imageBackgroundColor: string;
  onPress?: () => void;
}) {
  function showCourse() {
    Alert.alert("コースを表示しますか？")
  }

  return (
    <XStack
      alignItems="center"
      paddingHorizontal="$3"
      paddingVertical="$3"
      backgroundColor="white"
      justifyContent={"space-between"}
      marginBottom="$3"
      borderRadius="$4"
      gap={"$3.5"}
    >
      <TouchableOpacity onPress={onPress} style={{flex: 1}}>
        <XStack gap={"$3.5"} alignItems={"center"}>
          {imageUrl ? (
            <Image source={{uri: imageUrl}} width={63} height={63} borderRadius={8}/>
          ) : <View style={{width: 63, height: 63, backgroundColor: imageBackgroundColor, borderRadius: 8}}/>
          }
          <YStack flex={1}>
            <Text fontSize={20} fontWeight={"bold"} color={"#333"} marginBottom={"$1"}>
              {title}
            </Text>
            <Text fontSize={16} color={"#666"}>
              {subTitle}
            </Text>
          </YStack>
        </XStack>
      </TouchableOpacity>
      <TouchableOpacity style={{marginRight: 15}} onPress={showCourse}>
        <MaterialCommunityIcons name={"eye-off"} size={24} color="black"/>
      </TouchableOpacity>
    </XStack>
  )
}

export default function ManageCoursesScreen({navigation}: NativeStackScreenProps<RootStackParamList>) {
  return (
    <YStack minHeight={"100%"} backgroundColor={"white"}>
      <XStack
        alignItems="center"
        paddingHorizontal="$4"
        paddingVertical="$4"
        backgroundColor="white"
        justifyContent={"space-between"}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="chevron-left" size={24} color="#333"/>
        </TouchableOpacity>
        <Text fontSize={20} fontWeight="800" color="#333">
          非表示のコース
        </Text>
        <View width={24}/>
      </XStack>
      <YStack marginTop={"$4"}>
        <HiddenCourseCard title={"test"} subTitle={"test"} imageUrl={""} imageBackgroundColor={"black"}/>
      </YStack>
    </YStack>
  )
}
