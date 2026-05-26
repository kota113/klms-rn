import {TouchableOpacity, View} from "react-native";
import {Text, XStack, YStack} from "./ui";

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
            width: 55,
            height: 55,
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
            <Text fontSize={15} color="#333" numberOfLines={1}>
              {title}
            </Text>
            <Text fontSize={13} color="#666">
              {subText}
            </Text>
          </>): (
            <Text fontSize={17} color="#333">{title}</Text>
            )}
        </YStack>
      </XStack>
    </TouchableOpacity>
  )
}
