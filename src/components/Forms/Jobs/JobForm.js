import React, {useState, useCallback} from 'react';

import {useNavigation} from '@react-navigation/native';

import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {setInputForm, resetForm} from '../../../store/jobFormActions';

import {
  View,
  Button,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';

import Accordian from '../../../components/Elements/Accordian';
import InputGroup from '../../../components/Elements/InputGroup';
import InputWithSwitch from '../../../components/Elements/InputWithSwitch';
import DynamicSelectorList from '../../../components/DynamicSelectorList';
import PrioritySelector from '../../../components/Elements/PrioritySelector';

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {parsePriority} from '../../../utils/parsers';

// Firebase
import {newJob} from '../../../firebase/newJob';
import CustomButton from '../../Elements/CustomButton';
import {Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subtitle: {
    color: '#2A7BA5',
  },
  newJobScreen: {
    flex: 1,
    height: '100%',
    paddingTop: 20,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
  },
  asignList: {},
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
    textAlign: 'center',
    backgroundColor: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4F8AA3',
  },
});

const JobForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
    const newJobForm = {
      name: job?.name,
      observations: job?.observations,
      date: job?.date?.value,
      time: job?.time?.value,
      workers: job?.workers?.value,
      task: job?.task,
      house: job?.house?.value,
      priority: job?.priority?.value,
      done: false,
    };

    newJob(newJobForm);
    cleanForm();
    navigation.navigate('Jobs');
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
      {/* <ScrollView> */}
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
            setInputFormAction('time', {value: new Date(), switch: true})
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
              {job?.house?.value?.map((house, i) => (
                <React.Fragment>
                  <Text style={styles.subtitle}>{house.houseName}</Text>
                  {job?.house?.value?.length - 1 !== i && (
                    <Text style={styles.subtitle}> & </Text>
                  )}
                </React.Fragment>
              ))}
            </View>
          }
          switcher={job?.house?.switch}
          iconProps={{name: 'house', color: '#55A5AD'}}
          onOpen={() => setInputFormAction('house', {value: [], switch: true})}
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
              {parsePriority(job?.priority?.value)}
            </Text>,
          ]}
          switcher={job.priority?.switch}
          iconProps={{name: 'house', color: '#55A5AD'}}
          onOpen={() =>
            setInputFormAction('priority', {value: undefined, switch: true})
          }
          onClose={() =>
            setInputFormAction('priority', {
              value: undefined,
              switch: false,
            })
          }>
          <PrioritySelector
            get={job.priority?.value || []}
            set={(priority) => {
              setInputFormAction('priority', {
                ...job.priority,
                value: priority,
              });
            }}
          />
        </Accordian>
      </InputGroup>
      <InputGroup>
        <TextInput
          multiline
          numberOfLines={10}
          style={{height: 120}}
          placeholder="Observaciones"
          onChangeText={(text) => setInputFormAction('observations', text)}
          value={job.description}
        />
      </InputGroup>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'flex-end',
          marginBottom: 40,
        }}>
        <CustomButton title={'Crear trabajo'} onPress={handleSubmit} />
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default JobForm;
