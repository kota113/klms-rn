import {TouchableOpacity, View} from "react-native";
import {XStack, Text} from "tamagui";
import {YStack} from "@tamagui/stacks";

export default function Item({title, subText, onPress, icon}: { title: string, subText?: string, onPress: () => void, icon: React.ReactNode}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <XStack
        alignItems="center"
        paddingVertical="$3"
        backgroundColor="white"
      >
        <View
          style={{
            width: 59,
            height: 59,
            backgroundColor: '#f5f5f5',
            borderRadius: 8,
            marginRight: 14,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {icon}
        </View>
        <YStack flex={1} justifyContent={"space-between"} gap={"$2"}>
          {subText ? (<>
            <Text fontSize={17} fontWeight="600" color="#333" numberOfLines={1}>
              {title}
            </Text>
            <Text fontSize={13} color="#666">
              {subText}
            </Text>
          </>): (
            <Text fontSize={17} fontWeight="600" color="#333">{title}</Text>
            )}
        </YStack>
      </XStack>
    </TouchableOpacity>
  )
}
