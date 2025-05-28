import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../components/Navigation";

export default function CoursesScreen({navigation}: NativeStackScreenProps<RootStackParamList>) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Courses Screen</Text>
      <Text onPress={() => navigation.navigate("CourseDetail")}>move</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
