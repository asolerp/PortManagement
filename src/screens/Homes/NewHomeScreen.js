import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';
import NewFormHome from '../../components/Forms/Homes/NewHomeForm';

import TitlePage from '../../components/TitlePage';

const NewHomeScreen = ({navigation}) => {
  return (
    <React.Fragment>
      <StatusBar barStyle="default" />
      <View style={styles.container}>
        <TitlePage
          leftSide={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={25} color="black" />
            </TouchableOpacity>
          }
          title="Nueva casa"
          color="black"
        />
        <View style={styles.newHomeScreen}>
          <NewFormHome />
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  newHomeScreen: {
    flex: 7,
    paddingTop: 20,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
  },
});

export default NewHomeScreen;
