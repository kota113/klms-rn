import React from "react";
import {Text, TouchableOpacity, View} from "react-native";

export const TabButton: React.FC<{
  title: string;
  isActive?: boolean,
  onPress?: () => void,
  textRef?: React.RefObject<View | null>
}> = ({
  title,
  isActive = false,
  onPress,
  textRef
}) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        paddingVertical: 15,
        marginHorizontal: 15,
        alignItems: 'center'
      }}
    >
      <View ref={textRef} style={{ alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: isActive ? '800' : '400',
            color: isActive ? '#000000' : '#666',
            textAlign: 'center'
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);
