import React, {createRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Switch,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const Colors = {
  PRIMARY: '#1abc9c',

  WHITE: '#ffffff',
  LIGHTGREEN: '#BABABA',
  GREEN: '#0da935',

  GRAY: '#f7f7f7',
  LIGHTGRAY: '#C7C7C7',
  DARKGRAY: '#5E5E5E',
  CGRAY: '#ececec',
  OFFLINE_GRAY: '#535353',
};

const Accordian = ({title, textData}) => {
  const [expanded, setExpanded] = useState();

  const accordian = createRef();

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <View style={styles.accordianContainer}>
        <Text style={[styles.title, styles.font]}>{title}</Text>
        <Switch
          ref={accordian}
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={expanded ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleExpand}
          value={expanded}
        />
      </View>
      <View style={styles.parentHr} />
      {expanded && (
        <View style={styles.child}>
          <Text>{textData}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    color: 'black',
  },
  container: {},
  accordianContainer: {
    backgroundColor: 'red',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
  },
  parentHr: {
    height: 1,
    color: Colors.WHITE,
    width: '100%',
  },
  child: {
    padding: 16,
  },
});

export default Accordian;
