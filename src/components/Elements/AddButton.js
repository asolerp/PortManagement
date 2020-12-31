import React from 'react';
import {View, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const AddButton = () => {
  return (
    <View style={styles.container}>
      <Icon name="add" size={40} color={'white'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#58BFC0',
    zIndex: 100,
  },
});

export default AddButton;
