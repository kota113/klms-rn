import {Text, XStack} from "tamagui";
import {YStack} from "@tamagui/stacks";

export default function GradeItem({title, dueDate, fullScore, achievedScore}: {
  title: string,
  dueDate: string,
  fullScore: number,
  achievedScore: number,
}) {
  return (
    <XStack alignItems={"center"} justifyContent={"space-between"} paddingVertical="$2" marginVertical={"$2"}>
      <YStack gap={"$1.5"}>
        <Text fontSize={17} fontWeight="600" >{title}</Text>
        <Text>期限: {dueDate}</Text>
      </YStack>
      <Text fontSize={19}>{achievedScore}/{fullScore}</Text>
    </XStack>
  )
}
