import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import AddButton from '../../components/Elements/AddButton';
import TitlePage from '../../components/TitlePage';

const JobsScreen = ({navigation}) => {
  const handleNewJob = () => {
    navigation.navigate('NewJob');
  };

  return (
    <React.Fragment>
      <View style={styles.addButton}>
        <TouchableOpacity onPress={() => handleNewJob()}>
          <AddButton />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TitlePage title="Trabajos" />
        <View style={styles.jobsScreen}>
          <Text>No tienes nigún trabajo activo en este momento</Text>
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  jobsScreen: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 120,
    zIndex: 10,
  },
});

export default JobsScreen;
