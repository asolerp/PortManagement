import React from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';

import AddButton from '../components/Elements/AddButton';
import ProfileBar from '../components/ProfileBar';

const HomesScreen = ({navigation}) => {
  const handleNewHome = () => {
    navigation.navigate('NewHome');
  };

  return (
    <React.Fragment>
      <View style={styles.addButton}>
        <TouchableOpacity onPress={() => handleNewHome()}>
          <AddButton />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <ProfileBar />
        <View style={styles.homesScreen}>
          <Text>No tienes ninguna casa en este momento</Text>
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 120,
    zIndex: 10,
  },
  homesScreen: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomesScreen;
