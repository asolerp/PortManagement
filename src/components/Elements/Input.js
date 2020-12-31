import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const Input = ({
  label,
  name,
  value,
  onChange,
  inputStyles,
  labelStyle,
  ...args
}) => {
  return (
    <View style={styles.container}>
      <Text style={{...styles.label, ...labelStyle}}>{label}</Text>
      <TextInput
        autoCapitalize="none"
        value={value}
        onChangeText={(text) => onChange(text, name)}
        style={{...styles.input, ...inputStyles}}
        {...args}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    color: 'white',
    marginBottom: 10,
    fontSize: 15,
  },
  input: {
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: 'white',
  },
});

export default Input;
