import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const Input = ({
  label,
  name,
  value,
  onChange,
  inputStyles,
  labelStyle,
  error,
  ...args
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={error ? 'El campo es obligatorio' : label}
        placeholderTextColor={error ? 'red' : 'white'}
        autoCapitalize="none"
        value={value}
        style={
          error
            ? {...styles.input, ...styles.inputError, ...inputStyles}
            : {...styles.input, ...inputStyles}
        }
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
  inputError: {
    borderWidth: 2,
    borderColor: 'red',
  },
});

export default Input;
