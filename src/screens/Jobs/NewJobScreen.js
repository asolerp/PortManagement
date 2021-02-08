import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Accordian from '../../components/Elements/Accordian';
import InputGroup from '../../components/Elements/InputGroup';

import DateTimePicker from '@react-native-community/datetimepicker';

import TabBar from '../../components/TabBar';

import TitlePage from '../../components/TitlePage';

import moment from 'moment';
import InputWithSwitch from '../../components/Elements/InputWithSwitch';
import DynamicSelectorList from '../../components/DynamicSelectorList';
import PrioritySelector from '../../components/Elements/PrioritySelector';

import {parsePriority} from '../../utils/parsers';

// Firebase
// import {newJob} from '../../firebase/newJob';
import {useAddFirebase} from '../../hooks/useAddFirebase';
import {Text} from 'react-native';

const NewJobScreen = ({navigation}) => {
  const [activeScreen, setActiveScreen] = useState(0);

  // Form State
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [recurrente, setRecurrente] = useState(false);
  const [asignWorkers, setAsignWorkers] = useState([]);
  const [asignHouse, setAsignHouse] = useState([]);
  const [priority, setPriority] = useState();

  const {addFirebase, loading, error} = useAddFirebase('jobs');

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
      name,
      description,
      date,
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
            <Icon name="arrow-back-ios" size={25} color="black" />
          </TouchableOpacity>
        }
        title="Nuevo Trabajo"
        color="black"
      />
      <TabBar tabs={['GENERAL', 'TAREAS']}>
        <View style={[styles.newJobScreen]}>
          <ScrollView>
            <View style={{marginBottom: 20}}>
              <InputGroup>
                <TextInput
                  style={{height: 40}}
                  placeholder="Nombre"
                  onChangeText={(text) => setName(text)}
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
                  subtitle={moment(date).format('LL')}
                  iconProps={{name: 'calendar-today', color: 'red'}}
                  onOpen={() => setDate(new Date())}
                  onClose={() => setDate(undefined)}>
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
                <Accordian
                  title="Casa"
                  iconProps={{name: 'house', color: 'brown'}}>
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
              <Button
                onPress={handleSubmit}
                title="Guardar"
                loading={loading}
              />
            </View>
          </ScrollView>
        </View>
        <View>
          <Text>Hola</Text>
        </View>
      </TabBar>
    </View>
  );
};

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

export default NewJobScreen;
