import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  buttonWrapper: {
    backgroundColor: '#2A7BA5',
    borderRadius: 20,
    padding: 12,
  },
  titleStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
});

const CustomButton = ({title, onPress, loading = false, disabled = false}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={disabled}>
      <View
        style={
          disabled
            ? {...styles.buttonWrapper, ...{opacity: 0.5}}
            : {...styles.buttonWrapper}
        }>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.titleStyle}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
