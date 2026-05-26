import React, {useEffect, useRef} from 'react';
import {Animated, StyleProp, ViewStyle} from 'react-native';

type SkeletonProps = {
  width?: number | `${number}%` | string;
  height?: number;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'rounded';
};

export function Skeleton({
  width = '100%',
  height = 100,
  style,
  variant = 'default',
}: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.55)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 850,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.55,
          duration: 850,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width: width as ViewStyle['width'],
          height,
          backgroundColor: '#f0f0f0',
          borderRadius: variant === 'rounded' ? 999 : 8,
          opacity,
        },
        style,
      ]}
    />
  );
}

export function SkeletonText({width = '100%', height = 16, style}: Omit<SkeletonProps, 'variant'>) {
  return <Skeleton width={width} height={height} style={style} variant="default"/>;
}
