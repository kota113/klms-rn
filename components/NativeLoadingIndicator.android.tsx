import React from "react";
import {StyleSheet} from "react-native";
import {CircularProgressIndicator, Host} from "@expo/ui/jetpack-compose";
import {size} from "@expo/ui/jetpack-compose/modifiers";

type NativeLoadingIndicatorProps = {
  color?: string;
  size?: number;
};

export default function NativeLoadingIndicator({color = "#111111", size: indicatorSize = 48}: NativeLoadingIndicatorProps) {
  return (
    <Host matchContents style={[styles.host, {height: indicatorSize, width: indicatorSize}]}>
      <CircularProgressIndicator color={color} strokeWidth={indicatorSize <= 24 ? 2 : 4} modifiers={[size(indicatorSize, indicatorSize)]}/>
    </Host>
  );
}

const styles = StyleSheet.create({
  host: {
  },
});
