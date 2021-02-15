import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Messages = () => {
  return (
    <View style={styles.container}>
      <Text>MENSAJES</Text>
    </View>
  );
};

export default Messages;
