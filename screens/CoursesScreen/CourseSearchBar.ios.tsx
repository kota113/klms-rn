import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {XStack} from '../../components/ui';

type CourseSearchBarProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export function CourseSearchBar({value, onChangeText}: CourseSearchBarProps) {
  return (
    <XStack
      alignItems="center"
      height={44}
      marginHorizontal="$4"
      marginBottom="$4"
      paddingHorizontal="$4"
      backgroundColor="#2222"
      borderRadius="$5"
    >
      <MaterialIcons name="search" size={24} color="#999" style={styles.searchIcon}/>
      <TextInput
        placeholder="コースを検索"
        placeholderTextColor="#999"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </XStack>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 44,
    paddingVertical: 0,
    fontSize: 17,
    color: '#666',
  },
  searchIcon: {
    marginRight: 6,
  },
});
