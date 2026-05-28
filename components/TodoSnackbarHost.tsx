import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {Animated, Easing, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, XStack} from './ui';

export type TodoSnackbarResult = 'actionPerformed' | 'dismissed';

export type TodoSnackbarOptions = {
  message: string;
  actionLabel?: string;
  duration?: 'short' | 'long' | 'indefinite';
  withDismissAction?: boolean;
};

export type TodoSnackbarHostRef = {
  showSnackbar: (options: TodoSnackbarOptions) => Promise<TodoSnackbarResult>;
};

type ActiveSnackbar = TodoSnackbarOptions & {
  resolve: (result: TodoSnackbarResult) => void;
};

const durationMs = (duration: TodoSnackbarOptions['duration'], hasAction: boolean) => {
  if (duration === 'indefinite') {
    return null;
  }

  if (duration === 'long') {
    return 5200;
  }

  return hasAction ? 5200 : 3000;
};

export const TodoSnackbarHost = forwardRef<TodoSnackbarHostRef>((_, ref) => {
  const [activeSnackbar, setActiveSnackbar] = useState<ActiveSnackbar | null>(null);
  const activeSnackbarRef = useRef<ActiveSnackbar | null>(null);
  const snackbarProgress = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCurrentTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    if (!activeSnackbar) {
      return;
    }

    snackbarProgress.stopAnimation();
    snackbarProgress.setValue(0);
    Animated.timing(snackbarProgress, {
      toValue: 1,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [activeSnackbar, snackbarProgress]);

  const resolveSnackbar = (result: TodoSnackbarResult) => {
    clearCurrentTimeout();
    activeSnackbarRef.current?.resolve(result);
    activeSnackbarRef.current = null;
    Animated.timing(snackbarProgress, {
      toValue: 0,
      duration: 180,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      if (!activeSnackbarRef.current) {
        setActiveSnackbar(null);
      }
    });
  };

  useEffect(() => {
    return () => resolveSnackbar('dismissed');
  }, []);

  useImperativeHandle(ref, () => ({
    showSnackbar: (options) => {
      clearCurrentTimeout();
      activeSnackbarRef.current?.resolve('dismissed');
      activeSnackbarRef.current = null;

      return new Promise<TodoSnackbarResult>((resolve) => {
        const nextSnackbar = {...options, resolve};
        activeSnackbarRef.current = nextSnackbar;
        setActiveSnackbar(nextSnackbar);

        const delay = durationMs(options.duration, Boolean(options.actionLabel));
        if (delay) {
          timeoutRef.current = setTimeout(() => resolveSnackbar('dismissed'), delay);
        }
      });
    },
  }));

  if (!activeSnackbar) {
    return null;
  }

  const animatedSnackbarStyle = {
    opacity: snackbarProgress,
    transform: [
      {
        translateY: snackbarProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [72, 0],
        }),
      },
      {
        scale: snackbarProgress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.98, 1],
        }),
      },
    ],
  };

  return (
    <View pointerEvents="box-none" style={styles.container}>
      <Animated.View style={animatedSnackbarStyle}>
        <XStack alignItems="center" justifyContent="space-between" gap="$3" style={styles.snackbar}>
          <Text color="#ffffff" fontSize={14} style={styles.message}>
            {activeSnackbar.message}
          </Text>
          {activeSnackbar.actionLabel ? (
            <TouchableOpacity activeOpacity={0.75} onPress={() => resolveSnackbar('actionPerformed')}>
              <Text color="#ffffff" fontSize={14} fontWeight="700">
                {activeSnackbar.actionLabel}
              </Text>
            </TouchableOpacity>
          ) : null}
        </XStack>
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 16,
  },
  snackbar: {
    minHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    backgroundColor: '#323232',
  },
  message: {
    flex: 1,
  },
});
