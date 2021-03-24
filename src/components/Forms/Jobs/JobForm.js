import React, {useState, useCallback} from 'react';

import {useNavigation} from '@react-navigation/native';
import {BottomModal, ModalContent} from 'react-native-modals';

import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {setInputForm, resetForm} from '../../../store/jobFormActions';

import {Text, View, TextInput, StyleSheet} from 'react-native';

import Accordian from '../../../components/Elements/Accordian';
import InputGroup from '../../../components/Elements/InputGroup';
import DynamicSelectorList from '../../../components/DynamicSelectorList';
import PrioritySelector from '../../../components/Elements/PrioritySelector';

import moment from 'moment';
import 'moment/locale/es';

import {parsePriority} from '../../../utils/parsers';

// Firebase
import {newJob} from '../../../firebase/newJob';
import CustomButton from '../../Elements/CustomButton';
import DateSelector from './DateSelector';
import CustomInput from '../../Elements/CustomInput';
import {set} from 'react-native-reanimated';

moment.locale('es');

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

  const [lo, setLo] = useState(false);

  const {job} = useSelector(({jobForm: {job}}) => ({job}), shallowEqual);

  const setInputFormAction = useCallback(
    (label, value) => dispatch(setInputForm(label, value)),
    [dispatch],
  );

  const resetFormAction = useCallback(() => dispatch(resetForm()), [dispatch]);

  // Form State
  const [modalContent, setModalContent] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const cleanForm = () => {
    resetFormAction();
  };

  const handleSubmit = async () => {
    try {
      setLo(true);
      const newJobForm = {
        observations: job?.observations,
        date: job?.date?._d,
        time: job?.time?.toLocaleTimeString(),
        workers: job?.workers?.value,
        workersId: job?.workers?.value.map((worker) => worker.id),
        house: job?.house?.value,
        task: job?.task,
        priority: job?.priority?.value,
        done: false,
      };
      await newJob(newJobForm);
    } catch (err) {
      console.log(err);
    } finally {
      setLo(false);
      cleanForm();
      navigation.navigate('Jobs');
    }
  };

  const modalSwitcher = (modal) => {
    switch (modal) {
      case 'houses': {
        return ListDynamicHouse();
      }
      case 'workers': {
        return ListDynamicWorkers();
      }
      case 'date': {
        return DateTimeSelector();
      }
      default: {
        return ListDynamicWorkers();
      }
    }
  };

  const DateTimeSelector = () => (
    <DateSelector closeModal={() => setModalVisible(false)} />
  );

  const ListDynamicHouse = () => (
    <DynamicSelectorList
      collection="houses"
      store="jobForm"
      searchBy="houseName"
      schema={{img: 'houseImage', name: 'houseName'}}
      get={job?.house?.value || []}
      set={(house) => setInputFormAction('house', {...job.house, value: house})}
    />
  );

  const ListDynamicWorkers = () => (
    <DynamicSelectorList
      collection="users"
      store="jobForm"
      searchBy="firstName"
      schema={{img: 'profileImage', name: 'firstName'}}
      get={job?.workers?.value}
      set={(workers) =>
        setInputFormAction('workers', {...job.workers, value: workers})
      }
      multiple={true}
    />
  );

  return (
    <View style={[styles.newJobScreen]}>
      <BottomModal
        modalStyle={{borderRadius: 30}}
        height={0.5}
        visible={modalVisible}
        onSwipeOut={(event) => {
          setModalVisible(false);
        }}
        onTouchOutside={() => {
          setModalVisible(false);
        }}>
        <ModalContent style={{flex: 1, alignItems: 'center'}}>
          {modalContent && modalSwitcher(modalContent)}
        </ModalContent>
      </BottomModal>
      <InputGroup>
        <CustomInput
          title="Fecha"
          subtitle={
            job?.date && (
              <Text style={styles.subtitle}>
                {moment(job?.date).format('LL') +
                  ' ' +
                  moment(job?.time).format('LT')}
              </Text>
            )
          }
          iconProps={{name: 'alarm', color: '#55A5AD'}}
          onPress={() => {
            setModalContent('date');
            setModalVisible(true);
          }}
        />
      </InputGroup>
      <InputGroup>
        <CustomInput
          title="Asignar a.."
          subtitle={
            <View style={{flexDirection: 'row'}}>
              {job.workers?.value?.map((worker, i) => (
                <View key={worker.id} style={{flexDirection: 'row'}}>
                  <Text style={styles.subtitle}>{worker.firstName}</Text>
                  {job.workers?.value?.length - 1 !== i && (
                    <Text style={styles.subtitle}> & </Text>
                  )}
                </View>
              ))}
            </View>
          }
          iconProps={{name: 'alarm', color: '#55A5AD'}}
          onPress={() => {
            setModalContent('workers');
            setModalVisible(true);
          }}
        />
        <CustomInput
          title="Casa"
          subtitle={
            <View style={{flexDirection: 'row'}}>
              {job?.house?.value?.map((house, i) => (
                <View key={house.id}>
                  <Text style={styles.subtitle}>{house.houseName}</Text>
                  {job?.house?.value?.length - 1 !== i && (
                    <Text style={styles.subtitle}> & </Text>
                  )}
                </View>
              ))}
            </View>
          }
          iconProps={{name: 'house', color: '#55A5AD'}}
          onPress={() => {
            setModalContent('houses');
            setModalVisible(true);
          }}
        />
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
        <CustomButton
          title={'Crear trabajo'}
          onPress={handleSubmit}
          loading={lo}
        />
      </View>
    </View>
  );
};

export default JobForm;
