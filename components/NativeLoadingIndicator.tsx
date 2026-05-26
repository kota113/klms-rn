import React from "react";
import {ActivityIndicator} from "react-native";

type NativeLoadingIndicatorProps = {
  color?: string;
};

export default function NativeLoadingIndicator({color = "#111111"}: NativeLoadingIndicatorProps) {
  return <ActivityIndicator color={color} size="large"/>;
}
