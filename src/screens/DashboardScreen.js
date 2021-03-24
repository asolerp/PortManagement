import React, {useCallback, useState} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

import {useDispatch} from 'react-redux';

//Firebase
import auth from '@react-native-firebase/auth';

// Components
import JobsResume from '../components/JobsResume/JobsResume';
import ProfileBar from '../components/ProfileBar';
import TitlePage from '../components/TitlePage';
import IncidencesList from '../components/IncidencesList';

// UI
import LinearGradient from 'react-native-linear-gradient';

// Utils
import moment from 'moment';

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

  const logOut = async () => {
    try {
      await auth().signOut();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <TitlePage>
        <ProfileBar />
      </TitlePage>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#126D9B', '#67B26F']}
        style={styles.homeBackScreen}>
        <View style={styles.home}>
          <View style={styles.content}>
            <Text style={styles.todayStyle}>Hoy es {date.join(' ')} ☀️</Text>
            <Text style={styles.todayStyle}>🛠 Trabajos activos</Text>
            <JobsResume />
            <Text style={{...styles.todayStyle, ...{marginBottom: 20}}}>
              🚨 Incidencias
            </Text>
            <IncidencesList />
            {/* <Button title="Logout" onPress={logOut} /> */}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homeBackScreen: {
    flex: 1,
  },
  home: {
    backgroundColor: 'white',
    borderTopRightRadius: 50,
    flex: 5,
  },
  content: {
    paddingHorizontal: 20,
  },
  todayStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default DashboardScreen;
