import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector, shallowEqual} from 'react-redux';
import {View, Text, Button, StyleSheet} from 'react-native';

import TitlePage from '../../components/TitlePage';
import ProfileBar from '../../components/ProfileBar';
import StatusTaskFilter from '../../components/Filters/StatusTaskFilter';

//Firebase
import auth from '@react-native-firebase/auth';

import {useGetFirebase} from '../../hooks/useGetFirebase';

// UI
import LinearGradient from 'react-native-linear-gradient';
import JobItem from '../../components/JobItem';

// Utils
import moment from 'moment';
import {ScrollView} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
    fontSize: 20,
    color: '#284748',
    fontWeight: 'bold',
    marginTop: 20,
  },
  label: {
    fontSize: 20,
    width: '90%',
    color: '#284748',
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 20,
  },
});

const HomeWorker = () => {
  const navigation = useNavigation();
  const {user} = useSelector(
    ({userLoggedIn: {user}}) => ({user}),
    shallowEqual,
  );

  const {statusTaskFilter} = useSelector(
    ({filters: {statusTaskFilter}}) => ({statusTaskFilter}),
    shallowEqual,
  );

  const {list, loading, error} = useGetFirebase('jobs', null, [
    {
      label: 'workersId',
      operator: 'array-contains',
      condition: user.uid,
    },
  ]);

  const date = moment(new Date()).format('LL').split(' ');
  date[2] = date[2][0].toUpperCase() + date[2].slice(1);

  const logOut = async () => {
    try {
      await auth().signOut();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{backgroundColor: 'white'}}>
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
              <Text style={styles.label}>
                Estos son tus trabajos asignados para hoy 💪🏡
              </Text>
              <StatusTaskFilter />
              <View style={{marginTop: 20}}>
                {list
                  ?.filter((job) => job.done === statusTaskFilter)
                  .sort((a, b) => a.date - b.date)
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
              <Button title="Logout" onPress={logOut} />
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default HomeWorker;
