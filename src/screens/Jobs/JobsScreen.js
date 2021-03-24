import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Redux
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {setFilterDate} from '../../store/filterActions';

// UI
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import AddButton from '../../components/Elements/AddButton';
import HouseFilter from '../../components/Filters/HouseFilter';
import StatusTaskFilter from '../../components/Filters/StatusTaskFilter';
import JobItem from '../../components/JobItem';
import TitlePage from '../../components/TitlePage';
import CalendarStrip from 'react-native-calendar-strip';

//Firebase
import {useGetFirebase} from '../../hooks/useGetFirebase';

// Styles
import {defaultTextTitle} from '../../styles/common';

// Utils
import moment from 'moment';
import {generateCalendarDots} from '../../utils/parsers';

const JobsScreen = () => {
  const dispatch = useDispatch();
  const {list, loading, error} = useGetFirebase('jobs');

  const {houses, filterDate} = useSelector(
    ({filters: {houses, filterDate}}) => ({houses, filterDate}),
    shallowEqual,
  );

  const {statusTaskFilter} = useSelector(
    ({filters: {statusTaskFilter}}) => ({statusTaskFilter}),
    shallowEqual,
  );

  const [filteredList, setFilteredList] = useState([]);
  const navigation = useNavigation();

  const handleNewJob = () => {
    navigation.navigate('NewJobTaskSelector');
  };

  const setFilterDateAction = useCallback(
    (date) => dispatch(setFilterDate(date)),
    [dispatch],
  );

  useEffect(() => {
    if (houses === null) {
      const fList = list
        .filter((job) => job.house === null)
        .filter(
          (job) =>
            moment(job?.date?.toDate()).format('DD-MM-YY') ===
            moment(filterDate).format('DD-MM-YY'),
        );
      setFilteredList(fList);
    } else {
      if (houses?.length === 0) {
        setFilteredList(
          list.filter(
            (job) =>
              moment(job?.date?.toDate()).format('DD-MM-YY') ===
              moment(filterDate).format('DD-MM-YY'),
          ),
        );
      } else {
        const fList = list
          .filter((j) => j.house !== null)
          .filter((job) =>
            houses?.find((houseId) => houseId === job?.house[0]?.id),
          )
          .filter(
            (job) =>
              moment(job?.date?.toDate()).format('DD-MM-YY') ===
              moment(filterDate).format('DD-MM-YY'),
          );
        setFilteredList(fList);
      }
    }
  }, [houses, list, filterDate, statusTaskFilter]);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <React.Fragment>
      <StatusBar barStyle="default" />
      <View style={styles.addButton}>
        <TouchableOpacity onPress={() => handleNewJob()}>
          <AddButton iconName="add" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TitlePage
          title="Listado de trabajos"
          subtitle="En esta semana"
          color="white">
          <View style={{flex: 1}}>
            <CalendarStrip
              startingDate={moment(new Date()).subtract(3, 'days')}
              markedDates={generateCalendarDots(list)}
              selectedDate={moment(filterDate) || moment(new Date())}
              onDateSelected={(date) => setFilterDateAction(date)}
              style={styles.calendarContainer}
              scrollable
              iconStyle={{color: 'white'}}
              leftSelector={
                <Icon name="keyboard-arrow-left" size={15} color="white" />
              }
              rightSelector={
                <Icon name="keyboard-arrow-right" size={15} color="white" />
              }
              dateContainerStyle={{color: 'white'}}
              dateNameStyle={{color: 'white'}}
              dateNumberStyle={styles.dateNumberStyle}
              highlightDateNameStyle={styles.highlightDateNameStyle}
              highlightDateNumberStyle={styles.highlightDateNumberStyle}
              highlightDateContainerStyle={styles.highlightDateContainerStyle}
              calendarHeaderContainerStyle={styles.calendarHeaderContainerStyle}
              calendarHeaderStyle={styles.calendarHeaderStyle}
            />
          </View>
        </TitlePage>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#126D9B', '#67B26F']}
          style={styles.jobsBackScreen}>
          <ScrollView style={styles.jobsWrapper}>
            <View style={styles.jobsScreen}>
              <View style={styles.housesWrapper}>
                <HouseFilter />
              </View>
              <View style={styles.jobsListWrapper}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{...defaultTextTitle}}>🚀 Trabajos</Text>
                  <StatusTaskFilter />
                </View>
                {filteredList.length > 0 ? (
                  <View style={{marginTop: 20}}>
                    {filteredList
                      ?.filter((job) => job.done === statusTaskFilter)
                      .map((item) => (
                        <JobItem
                          job={item}
                          key={item.id}
                          onPress={() =>
                            navigation.navigate('JobScreen', {
                              jobId: item.id,
                            })
                          }
                        />
                      ))}
                  </View>
                ) : (
                  <View
                    style={{
                      height: 200,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '600',
                        color: '#2d2d2d',
                        textAlign: 'center',

                        paddingHorizontal: 50,
                      }}>
                      No tienes ninguna tarea creada para este día.
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  jobsBackScreen: {
    flex: 10,
  },
  jobsScreen: {
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 50,
  },
  housesWrapper: {
    height: 200,
  },
  jobsWrapper: {
    backgroundColor: 'white',
  },
  jobsListWrapper: {
    paddingHorizontal: 20,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    zIndex: 10,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowColor: '#2d2d2d',
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  calendarContainer: {
    height: '100%',
  },
  dateNumberStyle: {color: 'white', fontSize: 15},
  calendarHeaderContainerStyle: {
    marginTop: 10,
  },
  calendarHeaderStyle: {
    color: 'white',
    justifyContent: 'flex-start',
  },
  highlightDateNameStyle: {
    color: '#388088',
  },
  highlightDateNumberStyle: {
    fontSize: 15,
    color: '#388088',
  },
  highlightDateContainerStyle: {
    backgroundColor: 'white',
  },
});

export default JobsScreen;
