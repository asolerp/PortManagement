import React, {useCallback, useState} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

import {useDispatch} from 'react-redux';

//Firebase

// Components
import JobsResume from '../components/JobsResume/JobsResume';
import ProfileBar from '../components/ProfileBar';
import TitlePage from '../components/TitlePage';
import IncidencesList from '../components/IncidencesList';
import StatusIncidence from '../components/Filters/StatusIncidence';
// UI
import LinearGradient from 'react-native-linear-gradient';

// Utils
import moment from 'moment';
import {ScrollView} from 'react-native';

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const date = moment(new Date()).format('LL').split(' ');
  date[2] = date[2][0].toUpperCase() + date[2].slice(1);

  const logUser = useCallback(
    () =>
      dispatch({
        type: 'LOGOUT_USER',
      }),
    [dispatch],
  );

  return (
    <React.Fragment>
      <View style={{backgroundColor: 'white'}}>
        <TitlePage>
          <ProfileBar />
        </TitlePage>
      </View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#126D9B', '#67B26F']}
        style={styles.homeBackScreen}>
        <ScrollView style={styles.container} nestedScrollEnabled>
          <View style={styles.home}>
            <View style={styles.content}>
              <Text style={{...styles.todayStyle, ...{marginVertical: 20}}}>
                Hoy es {date.join(' ')} ☀️
              </Text>
              <Text style={styles.todayStyle}>🛠 Trabajos activos</Text>
              <JobsResume />
              <View style={styles.filterWrapper}>
                <Text style={{...styles.todayStyle}}>🚨 Incidencias</Text>
                <StatusIncidence />
              </View>
              <IncidencesList />
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 50,
  },
  homeBackScreen: {
    flex: 1,
  },
  home: {
    backgroundColor: 'white',
    flex: 5,
  },
  content: {
    paddingHorizontal: 20,
  },
  filterWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  todayStyle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
