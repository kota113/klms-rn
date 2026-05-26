import React from "react";
import {StyleSheet} from "react-native";
import {CircularProgressIndicator, Host} from "@expo/ui/jetpack-compose";
import {size} from "@expo/ui/jetpack-compose/modifiers";

type NativeLoadingIndicatorProps = {
  color?: string;
};

export default function NativeLoadingIndicator({color = "#111111"}: NativeLoadingIndicatorProps) {
  return (
    <Host matchContents style={styles.host}>
      <CircularProgressIndicator color={color} strokeWidth={4} modifiers={[size(48, 48)]}/>
    </Host>
  );
}

const styles = StyleSheet.create({
  host: {
    height: 48,
    width: 48,
  },
});
