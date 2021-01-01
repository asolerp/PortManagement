import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

const UserSelector = ({label}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.selector} />
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
