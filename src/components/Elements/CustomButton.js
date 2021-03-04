import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  buttonWrapper: {
    backgroundColor: '#2A7BA5',
    borderRadius: 20,
    padding: 10,
  },
  titleStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
});

const CustomButton = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.buttonWrapper}>
        <Text style={styles.titleStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
