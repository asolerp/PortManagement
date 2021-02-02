import React from 'react';
import {View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: 'white',
    paddingTop: 10,
    paddingLeft: 30,
    paddingBottom: 10,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowColor: 'black',
  },
});

const InputGroup = ({children}) => {
  console.log(children);
  return (
    <View style={styles.container}>
      {Array.isArray(children) ? (
        <View style={styles.inputContainer}>
          {children.map((elemnt, i) => (
            <React.Fragment>
              {elemnt}
              {i !== children.length - 1 && (
                <View
                  style={{
                    borderBottomColor: '#EAEAEA',
                    borderBottomWidth: 1,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </View>
      ) : (
        children
      )}
    </View>
  );
};

export default InputGroup;
