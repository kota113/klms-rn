import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  DropdownMenu,
  DropdownMenuItem,
  Host,
  IconButton,
  Text as ComposeText,
} from '@expo/ui/jetpack-compose';

type TodoHeaderMenuProps = {
  showCompleted: boolean;
  onShowCompletedChange: (showCompleted: boolean) => void;
};

export default function TodoHeaderMenu({showCompleted, onShowCompletedChange}: TodoHeaderMenuProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Host matchContents colorScheme="light" style={styles.host}>
      <DropdownMenu expanded={expanded} onDismissRequest={() => setExpanded(false)}>
        <DropdownMenu.Trigger>
          <IconButton onClick={() => setExpanded(true)}>
            <ComposeText style={{typography: 'headlineSmall'}}>⋮</ComposeText>
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Items>
          <DropdownMenuItem
            onClick={() => {
              onShowCompletedChange(!showCompleted);
              setExpanded(false);
            }}
          >
            <DropdownMenuItem.Text>
              <ComposeText>{showCompleted ? '完了済みを非表示' : '完了済みを表示'}</ComposeText>
            </DropdownMenuItem.Text>
          </DropdownMenuItem>
        </DropdownMenu.Items>
      </DropdownMenu>
    </Host>
  );
}

const styles = StyleSheet.create({
  host: {
    width: 44,
    height: 44,
  },
});
