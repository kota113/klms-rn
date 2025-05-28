import React from "react";
import {XStack, YStack} from "@tamagui/stacks";
import {Text, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

interface ModuleSectionProps {
  title: string;
  itemCount: number;
  children: React.ReactNode;
  isExpanded?: boolean;
}

export const ModuleSection: React.FC<ModuleSectionProps> = ({
                                                              title,
                                                              itemCount,
                                                              children
                                                            }) => {
  const [isExpanded, setIsExpanded] = React.useState(true);
  return (
    <YStack marginBottom="$2">
      <XStack
        alignItems="center"
        paddingHorizontal="$4"
        paddingVertical="$4"
        backgroundColor="#f8f9fa"
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: isExpanded ? '#e3f2fd' : '#f5f5f5',
            borderRadius: 8,
            marginRight: 12,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              width: 20,
              height: 14,
              backgroundColor: isExpanded ? '#2196f3' : '#ccc',
              borderRadius: 2
            }}
          />
        </View>
        <YStack flex={1}>
          <Text style={{fontSize: 16, fontWeight: '600', color: '#333'}}>
            {title}
          </Text>
          <Text style={{fontSize: 14, color: '#666', marginTop: 2}}>
            {itemCount} items
          </Text>
        </YStack>
        <MaterialIcons
          name="chevron-right"
          size={20}
          color="#ccc"
          style={{
            transform: [{rotate: isExpanded ? '-90deg' : '90deg'}]
          }}
        />
      </XStack>
      {isExpanded && (
        <YStack>
          {children}
        </YStack>
      )}
    </YStack>
  )
};
