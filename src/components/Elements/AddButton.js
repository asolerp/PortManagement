import React from 'react';
import {View, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const AddButton = () => {
  return (
    <View style={styles.container}>
      <Icon name="add" size={30} color={'white'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    elevation: 3,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3E93A8',
    zIndex: 100,
  },
});

export default AddButton;
