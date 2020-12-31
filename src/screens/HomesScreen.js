import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import AddButton from '../components/Elements/AddButton';
import ProfileBar from '../components/ProfileBar';

const HomesScreen = ({navigation}) => {
  const handleNewHome = () => {
    console.log('Navegando..!');
    navigation.navigate('NewHome');
  };

  return (
    <View style={styles.container}>
      <ProfileBar />
      <View style={styles.addButton}>
        <AddButton onPress={handleNewHome} />
      </View>
      <View style={styles.homesScreen}>
        <Text>No tienes ninguna casa en este momento</Text>
        <Button onPress={handleNewHome} title="Nueva casa" />
      </View>
    </View>
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
  },
  homesScreen: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomesScreen;
