import React, {useState} from 'react';
import {
  View,
  Keyboard,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {TabView, TabBar, SceneMap} from 'react-native-tab-view';

import TitlePage from '../../components/TitlePage';

import {Text} from 'react-native';
import JobForm from '../../components/Forms/Jobs/JobForm';
import TaskForm from '../../components/Forms/Jobs/TaskJob';

// UI
import LinearGradient from 'react-native-linear-gradient';

const HideKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const NewJobScreen = ({route, navigation}) => {
  const {taskName} = route.params;

  return (
    <React.Fragment>
      <StatusBar barStyle="default" />
      <View style={styles.container}>
        <TitlePage
          leftSide={
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <View style={styles.iconWrapper}>
                <Icon name="arrow-back" size={25} color="#5090A5" />
              </View>
            </TouchableOpacity>
          }
          subPage
          title={`Nuevo trabajo de ${taskName.toLowerCase()}`}
          color="white"
        />

        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#126D9B', '#67B26F']}
          style={styles.jobBackScreen}>
          <HideKeyboard>
            <View style={styles.jobScreen}>
              <JobForm />
            </View>
          </HideKeyboard>
        </LinearGradient>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  newJobScreen: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
  },
  jobBackScreen: {
    flex: 1,
  },
  jobScreen: {
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 50,
    height: '100%',
  },
  iconWrapper: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowColor: '#BCBCBC',
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  asignList: {
    flex: 1,
  },
  inputRecurrenteWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  inputRecurrente: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: 'transparent',
    color: 'black',
  },
  tabBarLabelStyle: {color: 'black', fontWeight: 'bold'},
  tabIndicator: {
    backgroundColor: '#2A7BA5',
    width: 10,
    height: 10,
    borderRadius: 100,
  },
});

export default NewJobScreen;
