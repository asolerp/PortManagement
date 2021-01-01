import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const UserSelector = ({label, onPress}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.selector} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  selector: {
    height: 50,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  label: {
    color: 'black',
    marginBottom: 10,
    fontSize: 15,
  },
});

export default UserSelector;
