import React from 'react';
import {View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 10,
    paddingLeft: 30,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  inputContainer: {},
  separator: {
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: 1,
  },
});

const InputGroup = ({children}) => {
  return (
    <View style={styles.container}>
      {Array.isArray(children) ? (
        <View style={styles.inputContainer}>
          {children.map((elemnt, i) => (
            <View key={i}>
              {elemnt}
              {i !== children.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </View>
      ) : (
        children
      )}
    </View>
  );
};

export default InputGroup;
