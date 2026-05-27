import React from "react";
import {MaterialIcons} from "@expo/vector-icons";
import {StyleSheet} from "react-native";
import Item from "../../../components/Item";

type ExternalLinkItemProps = {
  title: string;
  onPress: () => void;
};

export default function ExternalLinkItem({title, onPress}: ExternalLinkItemProps) {
  return (
    <Item
      title={title}
      onPress={onPress}
      icon={<MaterialIcons name="link" size={23} color="#666"/>}
      titleRightElement={<MaterialIcons name="open-in-new" size={18} color="#666"/>}
      titleStyle={styles.title}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    textDecorationLine: "underline",
  },
});
