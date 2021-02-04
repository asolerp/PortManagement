import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, Switch} from 'react-native';

import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Accordian from '../../components/Elements/Accordian';
import InputGroup from '../../components/Elements/InputGroup';

import DateTimePicker from '@react-native-community/datetimepicker';

import TabBar from '../../components/TabBar';

import TitlePage from '../../components/TitlePage';

import moment from 'moment';
import IconCircle from '../../components/Elements/IconCirlce';
import InputWithSwitch from '../../components/Elements/InputWithSwitch';
import DynamicSelectorList from '../../components/DynamicSelectorList';

const NewJobScreen = ({navigation}) => {
  const [value, onChangeText] = useState();

  // Form State
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [recurrente, setRecurrente] = useState(false);
  const [asignWorkers, setAsignWorkers] = useState([]);

  console.log(asignWorkers, 'asignWorkers');

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedDate) => {
    console.log(event, selectedDate);
    const currentDate = selectedDate || time;
    setTime(currentDate);
  };

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
        <ScrollView>
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
          </InputGroup>
          <InputGroup>
            <Accordian
              title="Fecha"
              subtitle={moment(date).format('LL')}
              iconProps={{name: 'calendar-today', color: 'red'}}
              textData="Esto es una prueba">
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                is24Hour={true}
                display="inline"
                onChange={onChangeDate}
              />
            </Accordian>
            <Accordian
              title="Hora"
              subtitle={moment(time).format('LT')}
              iconProps={{name: 'alarm', color: 'purple'}}
              textData="Esto es una prueba">
              <DateTimePicker
                testID="dateTimePicker"
                value={time}
                mode={'time'}
                is24Hour={true}
                display="default"
                onChange={onChangeTime}
              />
            </Accordian>
            <InputWithSwitch
              title="Recurrente"
              icon={{name: 'alarm', color: 'green'}}
              get={recurrente}
              set={setRecurrente}
            />
          </InputGroup>
          <InputGroup>
            <Accordian
              title="Asignar a..."
              iconProps={{name: 'person', color: 'blue'}}
              textData="Esto es una prueba">
              <View style={styles.asignList}>
                <DynamicSelectorList
                  collection="houses"
                  searchBy="houseName"
                  schema={{img: 'houseImage', name: 'houseName'}}
                  get={asignWorkers}
                  set={setAsignWorkers}
                />
              </View>
            </Accordian>
          </InputGroup>
        </ScrollView>
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
  inputRecurrenteWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  inputRecurrente: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default NewJobScreen;
