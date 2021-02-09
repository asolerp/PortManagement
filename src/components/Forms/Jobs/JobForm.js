import React, {useState, useContext} from 'react';

import {View, TextInput, ScrollView, StyleSheet} from 'react-native';

import {Button} from 'react-native-elements';

import Accordian from '../../../components/Elements/Accordian';
import InputGroup from '../../../components/Elements/InputGroup';
import InputWithSwitch from '../../../components/Elements/InputWithSwitch';
import DynamicSelectorList from '../../../components/DynamicSelectorList';
import PrioritySelector from '../../../components/Elements/PrioritySelector';

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {parsePriority} from '../../../utils/parsers';

// Firebase
import {useAddFirebase} from '../../../hooks/useAddFirebase';

// Context
import {Context} from '../../../store/jobFormStore';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newJobScreen: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
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
});

const JobForm = () => {
  const {addFirebase, loading, error} = useAddFirebase('jobs');
  const [activeScreen, setActiveScreen] = useState(0);
  const [state, dispatch] = useContext(Context);

  console.log('globalState', state);

  // Form State
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [recurrente, setRecurrente] = useState(false);
  const [asignWorkers, setAsignWorkers] = useState([]);
  const [asignHouse, setAsignHouse] = useState([]);
  const [priority, setPriority] = useState();

  const cleanForm = () => {
    setTime(undefined);
    setDate(undefined);
    setRecurrente(false);
    setAsignHouse([]);
    setAsignWorkers([]);
    setPriority(undefined);
  };

  const handleSubmit = () => {
    const job = {
      name: state?.name,
      description: state?.description,
      date: state?.date.value,
      time,
      recurrente,
      workers: asignWorkers,
      house: asignHouse,
      priority,
    };

    addFirebase(job);
    cleanForm();
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    dispatch({type: 'SET_DATE', payload: {...state.date, value: currentDate}});
  };

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setTime(currentDate);
  };

  return (
    <View style={[styles.newJobScreen]}>
      <ScrollView>
        <View style={{marginBottom: 20}}>
          <InputGroup>
            <TextInput
              style={{height: 40}}
              placeholder="Nombre"
              onChangeText={(text) =>
                dispatch({
                  type: 'SET_FORM',
                  label: 'name',
                  payload: text,
                })
              }
              value={name}
            />
            <TextInput
              style={{height: 40}}
              placeholder="Descripción"
              onChangeText={(text) => setDescription(text)}
              value={description}
            />
          </InputGroup>
          <InputGroup>
            <Accordian
              title="Fecha"
              switcher={state?.date.switch}
              handleSwitch={(s) =>
                dispatch({
                  type: 'SET_DATE',
                  payload: {value: state?.date.value, switch: s},
                })
              }
              subtitle={moment(state?.date.value).format('LL')}
              iconProps={{name: 'calendar-today', color: 'red'}}
              onOpen={() =>
                dispatch({
                  type: 'SET_DATE',
                  payload: {value: new Date(), switch: true},
                })
              }
              onClose={() =>
                dispatch({
                  type: 'SET_DATE',
                  payload: {value: undefined, switch: false},
                })
              }>
              <DateTimePicker
                testID="dateTimePicker"
                value={state?.date.value}
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
              onOpen={() => setTime(new Date())}
              onClose={() => setTime(undefined)}>
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
              iconProps={{name: 'person', color: 'blue'}}>
              <View style={styles.asignList}>
                <DynamicSelectorList
                  collection="users"
                  searchBy="firstName"
                  schema={{img: 'profileImage', name: 'firstName'}}
                  get={asignWorkers}
                  set={setAsignWorkers}
                  multiple={true}
                />
              </View>
            </Accordian>
            <Accordian title="Casa" iconProps={{name: 'house', color: 'brown'}}>
              <View style={styles.asignList}>
                <DynamicSelectorList
                  collection="houses"
                  searchBy="houseName"
                  schema={{img: 'houseImage', name: 'houseName'}}
                  get={asignHouse}
                  set={setAsignHouse}
                />
              </View>
            </Accordian>
          </InputGroup>
          <InputGroup>
            <Accordian
              title="Prioridad"
              subtitle={parsePriority(priority)}
              iconProps={{name: 'house', color: 'black'}}
              onClose={() => setPriority(undefined)}>
              <PrioritySelector setter={setPriority} getter={priority} />
            </Accordian>
          </InputGroup>
          <Button onPress={handleSubmit} title="Guardar" loading={loading} />
        </View>
      </ScrollView>
    </View>
  );
};

export default JobForm;
