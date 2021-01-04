import React, {useState, createRef} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// Animation
import {Transition, Transitioning} from 'react-native-reanimated';

const transition = (
  <Transition.Together>
    <Transition.Change />
  </Transition.Together>
);

const screenWidth = Math.round(Dimensions.get('window').width);

const TabBar = () => {
  const [tabPosition, setTabPosition] = useState(0);
  const [tabWidth, setTabWidth] = useState(0);

  const transRef = createRef();

  console.log(tabWidth);

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
              left: tabPosition === 0 ? tabWidth / 4 - 7.5 : null,
              right: tabPosition === 1 ? tabWidth / 4 - 7.5 : null,
            },
          }}
        />
        <View style={styles.tab}>
          <TouchableOpacity onPress={() => handleTab(0)}>
            <Text>Hola</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tab}>
          <TouchableOpacity onPress={() => handleTab(1)}>
            <Text>Adios</Text>
          </TouchableOpacity>
        </View>
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
  tab: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    alignSelf: 'stretch',
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
