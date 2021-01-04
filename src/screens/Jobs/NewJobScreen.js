import React from 'react';
import {View, StyleSheet} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';
import TabBar from '../../components/TabBar';

import TitlePage from '../../components/TitlePage';

const NewJobScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TitlePage
        leftSide={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-back-ios"
              size={30}
              color="black"
              style={{marginBottom: 20}}
            />
          </TouchableOpacity>
        }
        title="Nuevo Trabajo"
        color="black"
      />
      <TabBar />
      <View style={styles.newJobScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newJobScreen: {
    flex: 7,
    paddingBottom: 100,
    paddingTop: 20,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
  },
});

export default NewJobScreen;
