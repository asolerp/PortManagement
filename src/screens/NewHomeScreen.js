import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import ProfileBar from '../components/ProfileBar';

const NewHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Formulario nueva casa</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewHomeScreen;
