import React from 'react';
import {View, StyleSheet} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';
import NewFormHome from '../../components/Forms/NewHomeForm';

import TitlePage from '../../components/TitlePage';

const NewHomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TitlePage
        leftSide={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-ios" size={30} color="black" />
          </TouchableOpacity>
        }
        title="Nueva casa"
      />
      <View style={styles.newHomeScreen}>
        <NewFormHome />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  newHomeScreen: {
    flex: 6,
    paddingBottom: 100,
    justifyContent: 'flex-start',
  },
});

export default NewHomeScreen;
