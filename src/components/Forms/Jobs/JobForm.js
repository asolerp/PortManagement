import React, {useState, useContext} from 'react';

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

// Context
import {Context} from '../../../store/jobFormStore';

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
});

const JobForm = () => {
  const {addFirebase: addJob, loading, error} = useAddFirebase('jobs');
  const {addFirebase: addTask, loading: loadingTask, result} = useAddFirebase(
    'tasks',
  );

  const [state, dispatch] = useContext(Context);

  // Form State
  const [recurrente, setRecurrente] = useState(false);

  const cleanForm = () => {
    dispatch({
      type: 'RESET_FORM',
    });
  };

  const handleSubmit = () => {
    const job = {
      name: state?.job?.name,
      description: state?.job?.description,
      date: state?.job?.date?.value,
      time: state.job?.time?.value,
      workers: state?.job?.workers?.value,
      house: state?.job?.house?.value,
      priority: state?.job?.priority?.value,
      stats: {
        done: 0,
        total: state?.job?.tasks?.length,
      },
    };

    newJob(job, state?.job?.tasks);
    cleanForm();
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    dispatch({
      type: 'SET_FORM',
      label: 'date',
      payload: {...state.job.date, value: currentDate},
    });
  };

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate;
    dispatch({
      type: 'SET_FORM',
      label: 'time',
      payload: {...state.job.time, value: currentDate},
    });
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
              value={state?.job?.name}
            />
            <TextInput
              style={{height: 40}}
              placeholder="Descripción"
              onChangeText={(text) =>
                dispatch({
                  type: 'SET_FORM',
                  label: 'description',
                  payload: text,
                })
              }
              value={state?.job?.description}
            />
          </InputGroup>
          <InputGroup>
            <Accordian
              title="Fecha"
              switcher={state?.job?.date?.switch}
              subtitle={[
                <Text style={styles.subtitle}>
                  {moment(state?.job?.date?.value).format('LL')}
                </Text>,
              ]}
              iconProps={{name: 'calendar-today', color: '#55A5AD'}}
              onOpen={() => {
                dispatch({
                  type: 'SET_FORM',
                  label: 'date',
                  payload: {value: new Date(), switch: true},
                });
              }}
              onClose={() =>
                dispatch({
                  type: 'SET_FORM',
                  label: 'date',
                  payload: {value: undefined, switch: false},
                })
              }>
              <DateTimePicker
                testID="dateTimePicker"
                value={state?.job?.date?.value || new Date()}
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
                  {moment(state?.job?.time?.value).format('LT')}
                </Text>,
              ]}
              switcher={state?.job?.time?.switch}
              iconProps={{name: 'alarm', color: '#55A5AD'}}
              onOpen={() =>
                dispatch({
                  type: 'SET_FORM',
                  label: 'time',
                  payload: {value: new Date(), switch: true},
                })
              }
              onClose={() =>
                dispatch({
                  type: 'SET_FORM',
                  label: 'time',
                  payload: {value: undefined, switch: false},
                })
              }>
              <DateTimePicker
                testID="dateTimePicker"
                value={state?.job?.time?.value || new Date()}
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
                  {state?.job?.workers?.value?.map((worker, i) => (
                    <React.Fragment>
                      <Text style={styles.subtitle}>{worker.firstName}</Text>
                      {state?.job?.workers?.value?.length - 1 !== i && (
                        <Text style={styles.subtitle}> & </Text>
                      )}
                    </React.Fragment>
                  ))}
                </View>
              }
              switcher={state?.job?.workers?.switch}
              iconProps={{name: 'person', color: '#55A5AD'}}
              onOpen={() =>
                dispatch({
                  type: 'SET_FORM',
                  label: 'workers',
                  payload: {value: [], switch: true},
                })
              }
              onClose={() =>
                dispatch({
                  type: 'SET_FORM',
                  label: 'workers',
                  payload: {value: undefined, switch: false},
                })
              }>
              <View style={styles.asignList}>
                <DynamicSelectorList
                  collection="users"
                  searchBy="firstName"
                  schema={{img: 'profileImage', name: 'firstName'}}
                  get={state?.job?.workers?.value || []}
                  set={(workers) => {
                    dispatch({
                      type: 'SET_FORM',
                      label: 'workers',
                      payload: {...state.job.workers, value: workers},
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
                  {state?.job?.house?.value?.map((house, i) => (
                    <React.Fragment>
                      <Text style={styles.subtitle}>{house.houseName}</Text>
                      {state?.job?.house?.value?.length - 1 !== i && (
                        <Text style={styles.subtitle}> & </Text>
                      )}
                    </React.Fragment>
                  ))}
                </View>
              }
              switcher={state?.job?.house?.switch}
              iconProps={{name: 'house', color: '#55A5AD'}}
              onOpen={() =>
                dispatch({
                  type: 'SET_FORM',
                  label: 'house',
                  payload: {value: [], switch: true},
                })
              }
              onClose={() =>
                dispatch({
                  type: 'SET_FORM',
                  label: 'house',
                  payload: {value: undefined, switch: false},
                })
              }>
              <View style={styles.asignList}>
                <DynamicSelectorList
                  collection="houses"
                  searchBy="houseName"
                  schema={{img: 'houseImage', name: 'houseName'}}
                  get={state?.job?.house?.value || []}
                  set={(house) => {
                    dispatch({
                      type: 'SET_FORM',
                      label: 'house',
                      payload: {...state.job.house, value: house},
                    });
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
                  {parsePriority(state?.job?.priority?.value)}
                </Text>,
              ]}
              switcher={state?.job?.priority?.switch}
              iconProps={{name: 'house', color: '#55A5AD'}}
              onOpen={() =>
                dispatch({
                  type: 'SET_FORM',
                  label: 'priority',
                  payload: {value: undefined, switch: true},
                })
              }
              onClose={() =>
                dispatch({
                  type: 'SET_FORM',
                  label: 'priority',
                  payload: {value: undefined, switch: false},
                })
              }>
              <PrioritySelector
                get={state?.job?.priority?.value || []}
                set={(priority) => {
                  dispatch({
                    type: 'SET_FORM',
                    label: 'priority',
                    payload: {...state.job.priority, value: priority},
                  });
                }}
              />
            </Accordian>
          </InputGroup>
          <Button type="clear" onPress={cleanForm} title="Limpiar" />
          <Button onPress={handleSubmit} title="Guardar" loading={loading} />
        </View>
      </ScrollView>
    </View>
  );
};

export default JobForm;
