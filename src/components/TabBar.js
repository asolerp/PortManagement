import React, {useState, createRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// Animation
import {Transition, Transitioning} from 'react-native-reanimated';
import Tab from './TabBarReanimated/Tab';

const transition = (
  <Transition.Together>
    <Transition.Change />
  </Transition.Together>
);

const TabBar = ({tabs}) => {
  const [tabPosition, setTabPosition] = useState(0);
  const [tabWidth, setTabWidth] = useState(0);
  const [tabsPositions, setTabsPositions] = useState([]);

  console.log(tabsPositions);

  const transRef = createRef();

  const handleTab = (index) => {
    console.log(transRef.current.measure);
    transRef.current.animateNextTransition();
    setTabPosition(index);
  };

  return (
    <Transitioning.View
      ref={transRef}
      transition={transition}
      onLayout={(e) => setTabWidth(e.nativeEvent.layout.width)}
      style={styles.container}>
      <View style={styles.tabWrapper}>
        <View
          style={{
            ...styles.dot,
            ...{
              left: tabsPositions[tabPosition]?.x + 7.5,
            },
          }}
        />
        {tabs.map((tab, i) => (
          <Tab
            onLayout={(e) =>
              setTabsPositions([...tabsPositions, e.nativeEvent.layout])
            }
            title={tab}
            handleTab={handleTab}
            index={i}
          />
        ))}
      </View>
    </Transitioning.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    height: 60,
  },
  tabWrapper: {
    flex: 1,
    flexDirection: 'row',
  },

  dot: {
    height: 15,
    width: 15,
    backgroundColor: 'red',
    borderRadius: 100,
    position: 'absolute',
    bottom: 7,
  },
});

export default TabBar;
