import React, {useState, useCallback} from 'react';

import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {setInputForm, resetForm} from '../../../store/jobFormActions';

import {View, Text, TextInput, ScrollView, StyleSheet} from 'react-native';

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
import {newJob} from '../../../firebase/newJob';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subtitle: {
    color: '#2A7BA5',
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
  cleanButton: {
    textAlign: 'right',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4F8AA3',
  },
  newJob: {
    textAlign: 'right',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4F8AA3',
  },
});

const JobForm = () => {
  const dispatch = useDispatch();

  const {addFirebase: addJob, loading, error} = useAddFirebase('jobs');
  const {addFirebase: addTask, loading: loadingTask, result} = useAddFirebase(
    'tasks',
  );

  const {job} = useSelector(({jobForm: {job}}) => ({job}), shallowEqual);

  const setInputFormAction = useCallback(
    (label, value) => dispatch(setInputForm(label, value)),
    [dispatch],
  );

  const resetFormAction = useCallback(() => dispatch(resetForm()), [dispatch]);

  // Form State
  const [recurrente, setRecurrente] = useState(false);

  const cleanForm = () => {
    resetFormAction();
  };

  const handleSubmit = () => {
    const newJob = {
      name: job.name,
      description: job.description,
      date: job.date?.value,
      time: job.time?.value,
      workers: job.workers?.value,
      house: job.house?.value,
      priority: job.priority?.value,
      stats: {
        done: 0,
        total: job.tasks?.length,
      },
    };

    newJob(newJob, job.tasks);
    cleanForm();
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setInputFormAction('date', {...job.date, value: currentDate});
  };

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate;
    setInputFormAction('time', {...job.time, value: currentDate});
  };

  return (
    <View style={[styles.newJobScreen]}>
      <ScrollView>
        <View style={{marginBottom: 20}}>
          <InputGroup>
            <TextInput
              style={{height: 40}}
              placeholder="Nombre"
              onChangeText={(text) => setInputFormAction('name', text)}
              value={job.name}
            />
            <TextInput
              style={{height: 40}}
              placeholder="Descripción"
              onChangeText={(text) => setInputFormAction('description', text)}
              value={job.description}
            />
          </InputGroup>
          <InputGroup>
            <Accordian
              title="Fecha"
              switcher={job.date?.switch}
              subtitle={[
                <Text style={styles.subtitle}>
                  {moment(job.date?.value).format('LL')}
                </Text>,
              ]}
              iconProps={{name: 'calendar-today', color: '#55A5AD'}}
              onOpen={() => {
                setInputFormAction('date', {value: new Date(), switch: true});
              }}
              onClose={() =>
                setInputFormAction('date', {value: undefined, switch: false})
              }>
              <DateTimePicker
                testID="dateTimePicker"
                value={job.date?.value || new Date()}
                mode={'date'}
                is24Hour={true}
                display="inline"
                onChange={onChangeDate}
              />
            </Accordian>
            <Accordian
              title="Hora"
              subtitle={[
                <Text style={styles.subtitle}>
                  {moment(job.time?.value).format('LT')}
                </Text>,
              ]}
              switcher={job.time?.switch}
              iconProps={{name: 'alarm', color: '#55A5AD'}}
              onOpen={() =>
                setInputFormAction('date', {value: new Date(), switch: true})
              }
              onClose={() =>
                setInputFormAction('time', {value: undefined, switch: false})
              }>
              <DateTimePicker
                testID="dateTimePicker"
                value={job.time?.value || new Date()}
                mode={'time'}
                is24Hour={true}
                display="default"
                onChange={onChangeTime}
              />
            </Accordian>
            <InputWithSwitch
              title="Recurrente"
              disabled
              icon={{name: 'alarm', color: '#55A5AD'}}
              get={recurrente}
              set={setRecurrente}
            />
          </InputGroup>
          <InputGroup>
            <Accordian
              title="Asignar a..."
              subtitle={
                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  {job.workers?.value?.map((worker, i) => (
                    <React.Fragment>
                      <Text style={styles.subtitle}>{worker.firstName}</Text>
                      {job.workers?.value?.length - 1 !== i && (
                        <Text style={styles.subtitle}> & </Text>
                      )}
                    </React.Fragment>
                  ))}
                </View>
              }
              switcher={job.workers?.switch}
              iconProps={{name: 'person', color: '#55A5AD'}}
              onOpen={() =>
                setInputFormAction('workers', {value: [], switch: true})
              }
              onClose={() =>
                setInputFormAction('workers', {value: undefined, switch: false})
              }>
              <View style={styles.asignList}>
                <DynamicSelectorList
                  collection="users"
                  searchBy="firstName"
                  schema={{img: 'profileImage', name: 'firstName'}}
                  get={job.workers?.value || []}
                  set={(workers) => {
                    setInputFormAction('workers', {
                      ...job.workers,
                      value: workers,
                    });
                  }}
                  multiple={true}
                />
              </View>
            </Accordian>
            <Accordian
              title="Casa"
              subtitle={
                <View style={{flexDirection: 'row'}}>
                  {job.house?.value?.map((house, i) => (
                    <React.Fragment>
                      <Text style={styles.subtitle}>{house.houseName}</Text>
                      {job.house?.value?.length - 1 !== i && (
                        <Text style={styles.subtitle}> & </Text>
                      )}
                    </React.Fragment>
                  ))}
                </View>
              }
              switcher={job.house?.switch}
              iconProps={{name: 'house', color: '#55A5AD'}}
              onOpen={() =>
                setInputFormAction('house', {value: [], switch: true})
              }
              onClose={() =>
                setInputFormAction('house', {value: undefined, switch: false})
              }>
              <View style={styles.asignList}>
                <DynamicSelectorList
                  collection="houses"
                  searchBy="houseName"
                  schema={{img: 'houseImage', name: 'houseName'}}
                  get={job.house?.value || []}
                  set={(house) => {
                    setInputFormAction('house', {...job.house, value: house});
                  }}
                />
              </View>
            </Accordian>
          </InputGroup>
          <InputGroup>
            <Accordian
              title="Prioridad"
              subtitle={[
                <Text style={styles.subtitle}>
                  {parsePriority(job.priority?.value)}
                </Text>,
              ]}
              switcher={job.priority?.switch}
              iconProps={{name: 'house', color: '#55A5AD'}}
              onOpen={() =>
                setInputFormAction('house', {value: undefined, switch: true})
              }
              onClose={() =>
                setInputFormAction('house', {value: undefined, switch: false})
              }>
              <PrioritySelector
                get={job.priority?.value || []}
                set={(priority) => {
                  setInputFormAction('house', {
                    ...job.priority,
                    value: priority,
                  });
                }}
              />
            </Accordian>
          </InputGroup>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.cleanButton} type="clear" onPress={cleanForm}>
              Limpiar
            </Text>
            <Text
              style={styles.newJob}
              onPress={handleSubmit}
              loading={loading}>
              Guardar
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default JobForm;
