import React from "react";
import {MaterialIcons} from "@expo/vector-icons";
import {StyleSheet} from "react-native";
import Item from "../../../components/Item";

type SubHeaderItemProps = {
  title: string;
};

export default function SubHeaderItem({title}: SubHeaderItemProps) {
  return (
    <Item
      title={title}
      icon={<MaterialIcons name="title" size={23} color="#666"/>}
      titleStyle={styles.title}
      titleSelectable
    />
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#333",
    fontSize: 15,
  },
});
