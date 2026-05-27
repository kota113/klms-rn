import React from "react";
import {MaterialIcons} from "@expo/vector-icons";
import Item from "../../../components/Item";

type QuizItemProps = {
  title: string;
  onPress: () => void;
};

export default function QuizItem({title, onPress}: QuizItemProps) {
  return (
    <Item
      title={title}
      onPress={onPress}
      icon={<MaterialIcons name="quiz" size={23} color="#666"/>}
    />
  );
}
