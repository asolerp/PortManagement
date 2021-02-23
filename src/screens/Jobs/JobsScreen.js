import React, {useContext, useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import AddButton from '../../components/Elements/AddButton';
import HouseFilter from '../../components/Filters/HouseFilter';
import JobItem from '../../components/JobItem';
import TitlePage from '../../components/TitlePage';

//Firebase
import {useGetFirebase} from '../../hooks/useGetFirebase';

// Context
import {Context} from '../../store/filterStore';
import {ScrollView} from 'react-native-gesture-handler';

// UI
import LinearGradient from 'react-native-linear-gradient';

// Styles
import {defaultTextTitle} from '../../styles/common';

const JobsScreen = () => {
  const {list, loading, error} = useGetFirebase('jobs');
  const [state, dispatch] = useContext(Context);
  const [filteredList, setFilteredList] = useState([]);
  const navigation = useNavigation();

  const handleNewJob = () => {
    navigation.navigate('NewJob');
  };

  // useEffect(() => {
  //   if (state?.houses === null) {
  //     const fList = list.filter((job) => job.house === null);
  //     setFilteredList(fList);
  //   } else {
  //     if (state?.houses?.length === 0) {
  //       setFilteredList(list);
  //     } else {
  //       console.log('hola');
  //       const fList = list
  //         .filter((j) => j.house !== null)
  //         .filter((job) =>
  //           state?.houses?.find((houseId) => houseId === job?.house[0]?.id),
  //         );
  //       console.log('fList', fList);
  //       setFilteredList(fList);
  //     }
  //   }
  // }, [state, list]);

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
          <AddButton />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.jobsWrapper}>
        <View style={styles.container}>
          <TitlePage
            title="Listado de trabajos"
            subtitle="En esta semana"
            color="white"
          />
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#126D9B', '#67B26F']}
            style={styles.jobsBackScreen}>
            <View style={styles.jobsScreen}>
              <View style={styles.housesWrapper}>
                <HouseFilter />
              </View>
              <View style={styles.jobsListWrapper}>
                <Text style={defaultTextTitle}>Trabajos activos</Text>
                <View style={{marginTop: 20}}>
                  {list?.map((item, i) => (
                    <JobItem
                      job={item}
                      key={i}
                      onPress={() =>
                        navigation.navigate('JobScreen', {
                          jobId: item.id,
                        })
                      }
                    />
                  ))}
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
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
    borderRadius: 20,
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
});

export default JobsScreen;
