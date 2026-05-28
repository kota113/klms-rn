import React, {useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Text, XStack} from './ui';

type TodoHeaderMenuProps = {
  showCompleted: boolean;
  onShowCompletedChange: (showCompleted: boolean) => void;
};

export default function TodoHeaderMenu({showCompleted, onShowCompletedChange}: TodoHeaderMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel="ToDo menu"
        style={styles.button}
        onPress={() => setOpen(true)}
      >
        <MaterialCommunityIcons name="dots-vertical" size={24} color="#333"/>
      </TouchableOpacity>
      <Modal transparent visible={open} animationType="fade" onRequestClose={() => setOpen(false)}>
        <TouchableOpacity activeOpacity={1} style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.menu}>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => {
                onShowCompletedChange(!showCompleted);
                setOpen(false);
              }}
            >
              <XStack alignItems="center" gap="$3" style={styles.menuItem}>
                <MaterialCommunityIcons
                  name={showCompleted ? 'checkbox-marked' : 'checkbox-blank-outline'}
                  size={20}
                  color="#333"
                />
                <Text fontSize={15} color="#333">
                  {showCompleted ? '完了済みを非表示' : '完了済みを表示'}
                </Text>
              </XStack>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  overlay: {
    flex: 1,
    alignItems: 'flex-end',
    paddingTop: 72,
    paddingRight: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  menu: {
    minWidth: 220,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOpacity: 0.16,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 6},
    elevation: 8,
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});
