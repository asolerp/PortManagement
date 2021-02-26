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
import IconCircle from './IconCirlce';

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

const Accordian = ({
  title,
  subtitle,
  iconProps,
  children,
  switcher,
  onOpen = () => {},
  onClose = () => {},
}) => {
  const [expanded, setExpanded] = useState(false);
  // const [switchStatus, setSwitchStatus] = useState(false);

  const accordian = createRef();

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const toggleExpandWithSwitch = (event) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (event) {
      setExpanded(!expanded);
      onOpen();
    } else {
      setExpanded(false);
      onClose();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          switcher && toggleExpand();
        }}>
        <View style={styles.accordianContainer}>
          <View style={styles.iconContainer}>
            <IconCircle name={iconProps?.name} color={iconProps?.color} />
            <View style={styles.infoContainer}>
              <Text style={[styles.title, styles.font]}>{title}</Text>
              {subtitle && switcher && subtitle}
            </View>
          </View>
          <Switch
            ref={accordian}
            style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
            trackColor={{true: '#60AD88', false: 'grey'}}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleExpandWithSwitch}
            value={switcher}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.parentHr} />
      {expanded && (
        <React.Fragment>
          <View style={styles.separator} />
          <View style={styles.child}>{children}</View>
        </React.Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: 'black',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    borderRadius: 100,
    marginRight: 10,
    padding: 5,
  },
  iconStyle: {},
  accordianContainer: {
    flex: 1,
    height: 40,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoContainer: {},
  separator: {
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: 1,
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
    display: 'flex',
    paddingVertical: 10,
    paddingRight: 20,
  },
});

export default Accordian;
