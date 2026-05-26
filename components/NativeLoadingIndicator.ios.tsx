import React from "react";
import {StyleSheet} from "react-native";
import {Host, ProgressView} from "@expo/ui/swift-ui";
import {tint} from "@expo/ui/swift-ui/modifiers";

type NativeLoadingIndicatorProps = {
  color?: string;
  size?: number;
};

export default function NativeLoadingIndicator({color = "#111111", size = 48}: NativeLoadingIndicatorProps) {
  return (
    <Host matchContents style={[styles.host, {height: size, width: size}]}>
      <ProgressView modifiers={[tint(color)]}/>
    </Host>
  );
}

const styles = StyleSheet.create({
  host: {
    alignItems: "center",
    justifyContent: "center",
  },
});
