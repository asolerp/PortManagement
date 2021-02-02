import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Accordian from '../../components/Elements/Accordian';
import InputGroup from '../../components/Elements/InputGroup';

import TabBar from '../../components/TabBar';

import TitlePage from '../../components/TitlePage';

const NewJobScreen = ({navigation}) => {
  const [value, onChangeText] = useState();

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
      {/* <TabBar tabs={['General', 'Tareas']} /> */}
      <View style={styles.newJobScreen}>
        <InputGroup>
          <TextInput
            style={{height: 40}}
            placeholder="Nombre"
            onChangeText={(text) => onChangeText(text)}
            value={value}
          />
          <TextInput
            style={{height: 40}}
            placeholder="Descripción"
            onChangeText={(text) => onChangeText(text)}
            value={value}
          />
          <Accordian title="hola" textData="Esto es una prueba" />
        </InputGroup>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
