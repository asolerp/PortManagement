import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {setInputForm, resetForm} from '../../../store/jobFormActions';

//UI
import CalendarStrip from 'react-native-calendar-strip';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Utils
import moment from 'moment';
import {Platform} from 'react-native';
import CustomButton from '../../Elements/CustomButton';

const styles = StyleSheet.create({
  container: {},
  calendarContainer: {
    width: '100%',
    height: 90,
    paddingHorizontal: 5,
  },
  dateNumberStyle: {color: 'black', fontSize: 20},
  calendarHeaderContainerStyle: {},
  calendarHeaderStyle: {
    color: 'black',
    textTransform: 'capitalize',
  },
  highlightDateNameStyle: {
    color: 'white',
  },
  highlightDateNumberStyle: {
    fontSize: 20,
    color: 'white',
  },
  highlightDateContainerStyle: {
    backgroundColor: '#388088',
  },
  parentHr: {
    height: 1,
    backgroundColor: '#EAEAEA',
    width: '100%',
  },
});

const DateSelector = () => {
  const dispatch = useDispatch();
  const [dateSelected, setDateSelected] = useState();
  const [timeSelected, setTimeSelected] = useState();

  const {job} = useSelector(({jobForm: {job}}) => ({job}), shallowEqual);

  const setInputFormAction = useCallback(
    (label, value) => dispatch(setInputForm(label, value)),
    [dispatch],
  );

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
      }}>
      {/* <CalendarStrip
        style={{width: '100%', height: 150, paddingTop: 20, paddingBottom: 10}}
      /> */}
      <View>
        <CalendarStrip
          scrollable={Platform.OS === 'android'}
          startingDate={moment(new Date())}
          selectedDate={job?.date}
          onDateSelected={(date) => setInputFormAction('date', date)}
          style={styles.calendarContainer}
          iconStyle={{color: 'black'}}
          leftSelector={
            <Icon name="keyboard-arrow-left" size={15} color="black" />
          }
          rightSelector={
            <Icon name="keyboard-arrow-right" size={15} color="black" />
          }
          // dateContainerStyle={{color: 'black'}}
          // dateNameStyle={{color: 'black'}}
          dateNumberStyle={styles.dateNumberStyle}
          highlightDateNameStyle={styles.highlightDateNameStyle}
          highlightDateNumberStyle={styles.highlightDateNumberStyle}
          highlightDateContainerStyle={styles.highlightDateContainerStyle}
          calendarHeaderContainerStyle={styles.calendarHeaderContainerStyle}
          calendarHeaderStyle={styles.calendarHeaderStyle}
        />
      </View>
      <View style={styles.parentHr} />
      <DateTimePicker
        testID="dateTimePicker"
        value={job?.time || new Date()}
        mode={'time'}
        is24Hour={true}
        display="spinner"
        onChange={(event, selectedDate) =>
          setInputFormAction('time', selectedDate)
        }
      />
      <View style={{marginTop: 'auto'}}>
        <CustomButton title={'Seleccionar fecha'} />
      </View>
    </View>
  );
};

export default DateSelector;
