import React from 'react';
import {StyleSheet} from 'react-native';
import {Host, Menu, Toggle} from '@expo/ui/swift-ui';

type TodoHeaderMenuProps = {
  showCompleted: boolean;
  onShowCompletedChange: (showCompleted: boolean) => void;
};

export default function TodoHeaderMenu({showCompleted, onShowCompletedChange}: TodoHeaderMenuProps) {
  return (
    <Host matchContents colorScheme="light" style={styles.host}>
      <Menu label="" systemImage="ellipsis">
        <Toggle
          label={showCompleted ? '完了済みを非表示' : '完了済みを表示'}
          isOn={showCompleted}
          onIsOnChange={onShowCompletedChange}
        />
      </Menu>
    </Host>
  );
}

const styles = StyleSheet.create({
  host: {
    width: 44,
    minHeight: 44,
  },
});
