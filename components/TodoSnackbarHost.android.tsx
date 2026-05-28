import React, {forwardRef} from 'react';
import {StyleSheet} from 'react-native';
import {Host, Snackbar, SnackbarHost, type SnackbarHostRef} from '@expo/ui/jetpack-compose';
import type {TodoSnackbarHostRef} from './TodoSnackbarHost';

export const TodoSnackbarHost = forwardRef<TodoSnackbarHostRef>((_, ref) => {
  return (
    <Host colorScheme="light" style={styles.host} pointerEvents="box-none">
      <SnackbarHost ref={ref as React.Ref<SnackbarHostRef>}>
        <Snackbar actionContentColor="#ffffff"/>
      </SnackbarHost>
    </Host>
  );
});

const styles = StyleSheet.create({
  host: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 72,
  },
});
