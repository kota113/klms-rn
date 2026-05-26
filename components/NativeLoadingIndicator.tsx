import React from "react";
import {ActivityIndicator} from "react-native";

type NativeLoadingIndicatorProps = {
  color?: string;
  size?: number;
};

export default function NativeLoadingIndicator({color = "#111111", size = 48}: NativeLoadingIndicatorProps) {
  return <ActivityIndicator color={color} size={size <= 24 ? "small" : "large"}/>;
}
