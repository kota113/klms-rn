import React from "react";
import {
  Image as RNImage,
  ImageProps as RNImageProps,
  Pressable,
  StyleSheet,
  StyleProp,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
  TextInputProps as RNTextInputProps,
  View as RNView,
  ViewProps as RNViewProps,
  ViewStyle,
} from "react-native";
import {
  Button as ExpoButton,
  Host,
  TextInput as ExpoTextInput,
} from "@expo/ui";

type Token = number | string | undefined;

const space: Record<string, number> = {
  "$0.5": 2,
  "$1": 4,
  "$1.5": 6,
  "$2": 8,
  "$3": 12,
  "$3.5": 14,
  "$4": 16,
  "$4.5": 18,
  "$5": 20,
  "$6": 24,
};

function token(value: Token): number | string | undefined {
  if (typeof value !== "string") {
    return value;
  }

  return space[value] ?? value;
}

type BoxProps = RNViewProps & {
  alignItems?: ViewStyle["alignItems"];
  backgroundColor?: ViewStyle["backgroundColor"];
  borderBottomColor?: ViewStyle["borderBottomColor"];
  borderBottomWidth?: ViewStyle["borderBottomWidth"];
  borderColor?: ViewStyle["borderColor"];
  borderRadius?: Token;
  borderWidth?: ViewStyle["borderWidth"];
  flex?: ViewStyle["flex"];
  gap?: Token;
  height?: Token;
  justifyContent?: ViewStyle["justifyContent"];
  marginBottom?: Token;
  marginHorizontal?: Token;
  marginRight?: Token;
  marginTop?: Token;
  marginVertical?: Token;
  maxWidth?: Token;
  minWidth?: Token;
  maxHeight?: Token;
  minHeight?: Token;
  onPress?: () => void;
  padding?: Token;
  paddingBottom?: Token;
  paddingTop?: Token;
  paddingHorizontal?: Token;
  paddingLeft?: Token;
  paddingRight?: Token;
  paddingVertical?: Token;
  position?: ViewStyle["position"];
  width?: Token;
};

function boxStyle(props: BoxProps, direction?: "row" | "column"): StyleProp<ViewStyle> {
  return [
    direction ? {flexDirection: direction} : null,
    {
      alignItems: props.alignItems,
      backgroundColor: props.backgroundColor,
      borderBottomColor: props.borderBottomColor,
      borderBottomWidth: props.borderBottomWidth,
      borderColor: props.borderColor,
      borderRadius: token(props.borderRadius) as number | undefined,
      borderWidth: props.borderWidth,
      flex: props.flex,
      gap: token(props.gap) as number | undefined,
      height: token(props.height) as ViewStyle["height"],
      justifyContent: props.justifyContent,
      marginBottom: token(props.marginBottom) as number | undefined,
      marginHorizontal: token(props.marginHorizontal) as number | undefined,
      marginRight: token(props.marginRight) as number | undefined,
      marginTop: token(props.marginTop) as number | undefined,
      marginVertical: token(props.marginVertical) as number | undefined,
      maxWidth: token(props.maxWidth) as ViewStyle["maxWidth"],
      minHeight: token(props.minHeight) as ViewStyle["minHeight"],
      padding: token(props.padding) as number | undefined,
      paddingBottom: token(props.paddingBottom) as number | undefined,
      paddingHorizontal: token(props.paddingHorizontal) as number | undefined,
      paddingLeft: token(props.paddingLeft) as number | undefined,
      paddingRight: token(props.paddingRight) as number | undefined,
      paddingVertical: token(props.paddingVertical) as number | undefined,
      position: props.position,
      width: token(props.width) as ViewStyle["width"],
    },
    props.style,
  ];
}

function Box({
               alignItems,
               backgroundColor,
               borderBottomColor,
               borderBottomWidth,
               borderColor,
               borderRadius,
               borderWidth,
               children,
               direction,
               flex,
               gap,
               height,
               justifyContent,
               marginBottom,
               marginHorizontal,
               marginRight,
               marginTop,
               marginVertical,
               maxWidth,
               minHeight,
               onPress,
               padding,
               paddingBottom,
               paddingHorizontal,
               paddingLeft,
               paddingRight,
               paddingVertical,
               position,
               style,
               width,
               ...viewProps
             }: BoxProps & {direction?: "row" | "column"}) {
  const styleProps = {
    alignItems,
    backgroundColor,
    borderBottomColor,
    borderBottomWidth,
    borderColor,
    borderRadius,
    borderWidth,
    flex,
    gap,
    height,
    justifyContent,
    marginBottom,
    marginHorizontal,
    marginRight,
    marginTop,
    marginVertical,
    maxWidth,
    minHeight,
    padding,
    paddingBottom,
    paddingHorizontal,
    paddingLeft,
    paddingRight,
    paddingVertical,
    position,
    style,
    width,
  };
  const resolvedStyle = boxStyle(styleProps, direction);

  if (onPress) {
    return (
      <Pressable {...viewProps} onPress={onPress} style={resolvedStyle}>
        {children}
      </Pressable>
    );
  }

  return (
    <RNView {...viewProps} style={resolvedStyle}>
      {children}
    </RNView>
  );
}

export function XStack(props: BoxProps) {
  return <Box {...props} direction="row"/>;
}

export function YStack(props: BoxProps) {
  return <Box {...props} direction="column"/>;
}

export function View(props: BoxProps) {
  return <Box {...props}/>;
}

type TextProps = RNTextProps & {
  color?: TextStyle["color"];
  fontSize?: TextStyle["fontSize"];
  fontWeight?: TextStyle["fontWeight"];
  marginBottom?: Token;
  marginRight?: Token;
  marginTop?: Token;
  marginVertical?: Token;
  minHeight?: Token;
  minWidth?: Token;
  opacity?: TextStyle["opacity"];
  paddingHorizontal?: Token;
  textAlign?: TextStyle["textAlign"];
};

export function Text({style, color, fontSize, fontWeight, marginBottom, marginRight, marginTop, marginVertical, opacity, paddingHorizontal, textAlign, ...props}: TextProps) {
  return (
    <RNText
      {...props}
      style={[
        {
          color,
          fontSize,
          fontWeight,
          marginBottom: token(marginBottom) as number | undefined,
          marginRight: token(marginRight) as number | undefined,
          marginTop: token(marginTop) as number | undefined,
          marginVertical: token(marginVertical) as number | undefined,
          opacity,
          paddingHorizontal: token(paddingHorizontal) as number | undefined,
          textAlign,
        },
        style,
      ]}
    />
  );
}

type TextInputProps = Pick<
  RNTextInputProps,
  | "autoCapitalize"
  | "autoCorrect"
  | "autoFocus"
  | "defaultValue"
  | "editable"
  | "keyboardType"
  | "maxLength"
  | "multiline"
  | "onBlur"
  | "onChangeText"
  | "onFocus"
  | "placeholder"
  | "placeholderTextColor"
  | "returnKeyType"
  | "secureTextEntry"
  | "selectTextOnFocus"
  | "style"
  | "testID"
  | "value"
> & {
  cursorColor?: RNTextInputProps["cursorColor"];
};

export function TextInput({style, value, onBlur, onFocus, cursorColor, ...props}: TextInputProps) {
  const resolvedStyle = StyleSheet.flatten(style) as TextStyle & ViewStyle | undefined;

  return (
    <Host matchContents style={{
      backgroundColor: resolvedStyle?.backgroundColor,
      borderColor: resolvedStyle?.borderColor,
      borderRadius: resolvedStyle?.borderRadius,
      borderWidth: resolvedStyle?.borderWidth,
      height: resolvedStyle?.height,
      opacity: resolvedStyle?.opacity,
      padding: resolvedStyle?.padding,
      paddingBottom: resolvedStyle?.paddingBottom,
      paddingHorizontal: resolvedStyle?.paddingHorizontal,
      paddingLeft: resolvedStyle?.paddingLeft,
      paddingRight: resolvedStyle?.paddingRight,
      paddingTop: resolvedStyle?.paddingTop,
      paddingVertical: resolvedStyle?.paddingVertical,
      width: resolvedStyle?.width,
    }}>
      <ExpoTextInput
        {...props}
        defaultValue={value ?? props.defaultValue}
        cursorColor={cursorColor ?? undefined}
        onBlur={onBlur ? () => onBlur({} as never) : undefined}
        onFocus={onFocus ? () => onFocus({} as never) : undefined}
        textStyle={{
          color: typeof resolvedStyle?.color === "string" ? resolvedStyle.color : undefined,
          fontSize: typeof resolvedStyle?.fontSize === "number" ? resolvedStyle.fontSize : undefined,
          fontWeight: resolvedStyle?.fontWeight ? String(resolvedStyle.fontWeight) as "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" : undefined,
          lineHeight: typeof resolvedStyle?.lineHeight === "number" ? resolvedStyle.lineHeight : undefined,
          textAlign: resolvedStyle?.textAlign === "auto" || resolvedStyle?.textAlign === "justify" ? undefined : resolvedStyle?.textAlign,
        }}
      />
    </Host>
  );
}

type ImageProps = RNImageProps & {
  backgroundColor?: ViewStyle["backgroundColor"];
  borderRadius?: Token;
  height?: Token;
  width?: Token;
};

export function Image({style, backgroundColor, borderRadius, height, width, ...props}: ImageProps) {
  return (
    <RNImage
      {...props}
      style={[
        {
          backgroundColor,
          borderRadius: token(borderRadius) as number | undefined,
          height: token(height) as ViewStyle["height"],
          width: token(width) as ViewStyle["width"],
        },
        style,
      ]}
    />
  );
}

type ButtonProps = {
  children: string;
  disabled?: boolean;
  onPress?: () => void;
  variant?: "filled" | "outlined" | "text";
};

export function Button({children, disabled, onPress, variant}: ButtonProps) {
  return (
    <Host matchContents>
      <ExpoButton disabled={disabled} label={children} onPress={onPress} variant={variant}/>
    </Host>
  );
}
