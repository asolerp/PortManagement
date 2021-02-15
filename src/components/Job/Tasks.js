import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Tasks = () => {
  return (
    <View style={styles.container}>
      <Text>TAREAS</Text>
    </View>
  );
};

export default Tasks;
