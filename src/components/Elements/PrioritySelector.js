import React from 'react';
import {Touchable} from 'react-native';
import {View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Label from './Label';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  labelWrapper: {
    width: 100,
  },
});

const PrioritySelector = ({setter, getter}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setter('low')}
        style={styles.labelWrapper}>
        <Label title="Baja" color="#58BFC0" active={getter === 'low'} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setter('medium')}
        style={styles.labelWrapper}>
        <Label title="Media" color="#DDD363" active={getter === 'medium'} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setter('height')}
        style={styles.labelWrapper}>
        <Label title="Alta" color="#DB6E6E" active={getter === 'height'} />
      </TouchableOpacity>
    </View>
  );
};

export default PrioritySelector;
