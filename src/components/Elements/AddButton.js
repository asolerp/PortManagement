import React from 'react';
import {View, StyleSheet, TouchableHighlight} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const AddButton = ({onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={onPress}>
        <Icon name="add" size={40} color={'white'} />
      </TouchableHighlight>
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
