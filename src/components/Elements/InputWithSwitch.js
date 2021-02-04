import React from 'react';
import {View, StyleSheet, Text, TextInput, Switch} from 'react-native';

import IconCircle from './IconCirlce';

const styles = StyleSheet.create({
  inputRecurrenteWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  inputRecurrente: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const InputWithSwitch = ({title, icon, get, set}) => {
  return (
    <View style={styles.inputRecurrenteWrapper}>
      <View style={styles.inputRecurrente}>
        {icon && <IconCircle name={icon.name} color={icon.color} />}
        <Text>{title}</Text>
      </View>
      <Switch
        style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
        trackColor={{false: '#C9C9C9', true: '#81b0ff'}}
        thumbColor={get ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={(e) => set(e)}
        value={get}
      />
    </View>
  );
};

export default InputWithSwitch;
