import React from "react";
import {StyleSheet} from "react-native";
import {Host, ProgressView} from "@expo/ui/swift-ui";

type NativeLoadingIndicatorProps = {
  color?: string;
};

export default function NativeLoadingIndicator(_props: NativeLoadingIndicatorProps) {
  return (
    <Host matchContents style={styles.host}>
      <ProgressView/>
    </Host>
  );
}

const styles = StyleSheet.create({
  host: {
    alignItems: "center",
    height: 48,
    justifyContent: "center",
    width: 48,
  },
});
